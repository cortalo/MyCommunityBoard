"use server";
import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { auth } from "./auth";
import { selectUserByEmail } from "./UserMapper";

export async function selectPostComments(postId, offset, limit) {
  let query = supabase.from("Comment").select("*").eq("entityType", 0);
  query = query.eq("entityId", postId);
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

  const user = await selectUserByEmail(session.user.email);

  const { data, error } = await supabase
    .from("Comment")
    .insert([
      {
        entityType: formData.get("entityType"),
        entityId: formData.get("entityId"),
        targetId: formData.get("targetId"),
        content,
        status: formData.get("status"),
        userId: user[0].id, // or however you store user ID
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
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
