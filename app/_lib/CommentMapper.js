import supabase from "./supabase";

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
