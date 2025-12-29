"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import supabase from "./supabase";
import { selectUserByEmail } from "./UserMapper";
import { SYSTEM_USER_ID } from "@/lib/constants";

/**
 * Select latest message from each conversation for a user
 * @param {number} userId - User ID
 * @param {number} offset - Offset for pagination
 * @param {number} limit - Limit for pagination
 * @return {Promise<Array>} List of latest messages per conversation
 */
export async function selectConversations(userId, offset, limit) {
  const { data, error } = await supabase.rpc("get_user_conversations", {
    user_id_param: userId,
    offset_param: offset,
    limit_param: limit,
  });

  if (error) {
    console.error(error);
    throw new Error("Conversations cannot be loaded");
  }

  return data;
}

export async function selectByConversationId(conversationId, offset, limit) {
  let query = supabase.from("Message").select("*");
  query = query.eq("conversationId", conversationId);
  query = query.order("id", { ascending: false });
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Message cannot be loaded");
  }

  return data;
}

export async function createMessage(formData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const fromUserId = session.user.id;
  const toUser = await selectUserByEmail(formData.get("toEmail"));
  const content = formData.get("content");

  if (!content) {
    return { error: "Content are required" };
  }
  if (!toUser) {
    return { error: "Email does exist for sending PM" };
  }

  const conversationId =
    fromUserId < toUser[0].id
      ? `${fromUserId}_${toUser[0].id}`
      : `${toUser[0].id}_${fromUserId}`;

  const { data, error } = await supabase
    .from("Message")
    .insert([
      {
        created_at: new Date().toISOString(),
        fromId: fromUserId,
        toId: toUser[0].id,
        conversationId,
        content,
        status: 0,
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/letter/detail/${conversationId}`);
  return { success: true, data };
}

export async function getConversationCount(conversationId) {
  let query = supabase
    .from("Message")
    .select("*", { count: "exact", head: true });
  query = query.eq("conversationId", conversationId);

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Conversation count cannot be loaded");
  }

  return count;
}

export async function getConversationUnreadCount(conversationId, fromId) {
  let query = supabase
    .from("Message")
    .select("*", { count: "exact", head: true });
  query = query.eq("conversationId", conversationId);
  query = query.eq("fromId", fromId);
  query = query.eq("status", 0);

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Conversation count cannot be loaded");
  }

  return count;
}

export async function getConversationTotalUnreadCount(userId) {
  let query = supabase
    .from("Message")
    .select("*", { count: "exact", head: true });
  query = query.neq("fromId", 1);
  query = query.neq("fromId", userId);
  query = query.eq("status", 0);

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Conversation count cannot be loaded");
  }

  return count;
}

export async function readConversation(id) {
  const { data, error } = await supabase
    .from("Message")
    .update({ status: 1 })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}

export async function createSystemMessage(event) {
  const content = {
    userId: event.userId,
    entityType: event.entityType,
    entityId: event.entityId,
    ...event.data, // includes postId, etc.
  };

  const { data, error } = await supabase
    .from("Message")
    .insert([
      {
        created_at: new Date().toISOString(),
        fromId: SYSTEM_USER_ID,
        toId: event.entityUserId,
        conversationId: event.topic, // "comment", "like", or "follow"
        content: JSON.stringify(content),
        status: 0,
      },
    ])
    .select();

  if (error) {
    console.error("Failed to create system message:", error);
    throw error;
  }

  return data;
}
