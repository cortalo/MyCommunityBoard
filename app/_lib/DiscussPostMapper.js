import supabase from "./supabase";

export async function getDiscussPosts() {
  const { data, error } = await supabase.from("DiscussPost").select("*");

  if (error) {
    console.log(error);
    throw new Error("Discuss posts cannot be loaded");
  }

  return data;
}
