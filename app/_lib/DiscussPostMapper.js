import supabase from "./supabase";

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

  // Apply pagination with offset and limit
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data;
}
