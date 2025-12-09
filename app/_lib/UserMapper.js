import supabase from "./supabase";

/**
 * Select user from database
 * @param {number} id - the id
 * @return {Promise<Array>} a list of user
 */
export async function selectUserById(id) {
  let query = supabase.from("users").select("*").eq("id", id);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data;
}

export async function selectUserByEmail(email) {
  let query = supabase.from("users").select("*").eq("email", email);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data;
}
