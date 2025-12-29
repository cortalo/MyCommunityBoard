"use server";

import { LikeService } from "@/lib/likeService";
import { auth } from "./auth";

export async function toggleLike(entityType, entityId, entityUserId) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const isLiked = await LikeService.like(
    userId,
    entityType,
    entityId,
    entityUserId
  );
  const likeCount = await LikeService.findEntityLikeCount(entityType, entityId);

  // No revalidatePath needed

  return { success: true, isLiked, likeCount };
}
