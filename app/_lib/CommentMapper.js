"use server";
import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { auth } from "./auth";
import { updatePostCommentCount } from "./DiscussPostMapper";

export async function selectPostComments(postId, offset, limit) {
  let query = supabase.from("Comment").select("*").eq("entityType", 0);
  query = query.eq("entityId", postId);
  query = query.order("id", { ascending: true });
  query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Comments cannot be loaded");
  }

  return data;
}

export async function selectCommentReplys(commentId) {
  let query = supabase.from("Comment").select("*").eq("entityType", 1);
  query = query.eq("entityId", commentId);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("CommentReply cannot be loaded");
  }

  return data;
}

export async function addComment(formData) {
  const session = await auth();

  if (!session || session.user.email != formData.get("userEmail")) {
    return { error: "Unauthorized" };
  }

  const content = formData.get("content");

  // Validate
  if (!content) {
    return { error: "Content are required" };
  }

  const { data, error } = await supabase
    .from("Comment")
    .insert([
      {
        entityType: formData.get("entityType"),
        entityId: formData.get("entityId"),
        targetId: formData.get("targetId"),
        content,
        status: formData.get("status"),
        userId: session.user.id, // or however you store user ID
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  if (formData.get("entityType") == 0) {
    const commentCount = await getCommenttCount(formData.get("entityId"));
    const { data, error } = await updatePostCommentCount(
      formData.get("entityId"),
      commentCount
    );
    if (error) {
      return { error: error.message };
    }
  }

  // Refresh the page data
  revalidatePath("/discuss/" + formData.get("postId"));

  return { success: true, data };
}

/**
 * Get the total count of comment for a post
 * @param {number} postId -
 * @return {Promise<number>} total number of discussPosts
 */
export async function getCommenttCount(postId) {
  let query = supabase
    .from("Comment")
    .select("*", { count: "exact", head: true });
  query = query.eq("entityType", 0);
  query = query.eq("entityId", postId);

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Comment count cannot be loaded");
  }

  return count;
}

export async function getReplyCount(commentId) {
  let query = supabase
    .from("Comment")
    .select("*", { count: "exact", head: true });
  query = query.eq("entityType", 1);
  query = query.eq("entityId", commentId);

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Reply count cannot be loaded");
  }

  return count;
}
