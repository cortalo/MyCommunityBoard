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
