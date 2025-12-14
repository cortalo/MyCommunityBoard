"use server";
import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { auth } from "./auth";

/**
 * Select DiscussPosts from database
 * @param {number} userId - if userId = 0, return posts from any userId
 * @param {number} offset - offset for pagination
 * @param {number} limit - limit for pagination
 * @return {Promise<Array>} a list of discussPost
 */
export async function selectDiscussPosts(userId, offset, limit) {
  let query = supabase.from("DiscussPost").select("*");

  // If userId is not 0, filter by userId
  if (userId !== 0) {
    query = query.eq("user_id", userId); // Use 'userId' if that's your column name
  }
  query = query.order("id", { ascending: false });

  // Apply pagination with offset and limit
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data;
}

export async function selectDiscussPostById(id) {
  let query = supabase.from("DiscussPost").select("*").eq("id", id);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data[0];
}

/**
 * Get the total count of DiscussPosts
 * @param {number} userId - if userId = 0, return count of all posts, otherwise count for specific user
 * @return {Promise<number>} total number of discussPosts
 */
export async function getDiscussPostCount(userId) {
  let query = supabase
    .from("DiscussPost")
    .select("*", { count: "exact", head: true });

  // If userId is not 0, filter by userId
  if (userId !== 0) {
    query = query.eq("user_id", userId);
  }

  const { count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss post count cannot be loaded");
  }

  return count;
}

export async function createPost(formData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title");
  const content = formData.get("content");

  // Validate
  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  const { data, error } = await supabase
    .from("DiscussPost")
    .insert([
      {
        title,
        content,
        userId: session.user.id, // or however you store user ID
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  // Refresh the page data
  revalidatePath("/");

  return { success: true, data };
}

export async function updatePostCommentCount(id, value) {
  const { data, error } = await supabase
    .from("DiscussPost")
    .update({ commentCount: value })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}
