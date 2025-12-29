"use server";

import { EntityType } from "@/lib/constants";
import { auth } from "./auth";
import { FollowService } from "@/lib/followService";

export async function toggleFollow(isFollow, entityType, entityId) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { error: "Unauthorized" };
  }

  if (entityType === EntityType.USER && userId === entityId) {
    return { error: "Cannot follow yourself" };
  }

  if (isFollow) {
    await FollowService.unfollow(userId, entityType, entityId);
  } else {
    await FollowService.follow(userId, entityType, entityId);
  }

  const newStatus = await FollowService.hasFollowed(
    userId,
    entityType,
    entityId
  );

  // No revalidatePath needed

  return { success: true, newStatus };
}
