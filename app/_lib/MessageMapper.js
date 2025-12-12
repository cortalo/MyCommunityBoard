"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import supabase from "./supabase";
import { selectUserByEmail } from "./UserMapper";

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

  const fromUser = await selectUserByEmail(session.user.email);
  const toUser = await selectUserByEmail(formData.get("toEmail"));
  const content = formData.get("content");

  if (!content) {
    return { error: "Content are required" };
  }
  if (!toUser) {
    return { error: "Email does exist for sending PM" };
  }

  const conversationId =
    fromUser[0].id < toUser[0].id
      ? `${fromUser[0].id}_${toUser[0].id}`
      : `${toUser[0].id}_${fromUser[0].id}`;

  const { data, error } = await supabase
    .from("Message")
    .insert([
      {
        created_at: new Date().toISOString(),
        fromId: fromUser[0].id,
        toId: toUser[0].id,
        conversationId,
        content,
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/letter/detail/${conversationId}`);
  return { success: true, data };
}
