import supabase from "./supabase";

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
