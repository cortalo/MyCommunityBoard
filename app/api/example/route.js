// app/api/example/route.js
import { redis } from "@/lib/redis";

export async function GET() {
  await redis.set("key", "hello");
  const value = await redis.get("key");

  return Response.json({ value });
}
