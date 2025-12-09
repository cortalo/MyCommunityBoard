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

export async function insertData(tableName, dataObject) {
  const { data, error } = await supabase.from(tableName).insert([dataObject]);

  if (error) {
    console.log("Error inserting data:", error);
    throw error;
  }

  return data;
}

export async function updateUserName(tableName, id, value) {
  const { data, error } = await supabase
    .from(tableName)
    .update({ name: value })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}

export async function updateUserImage(tableName, id, value) {
  const { data, error } = await supabase
    .from(tableName)
    .update({ image: value })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}
