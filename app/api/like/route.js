import { auth } from "@/app/_lib/auth";
import { LikeService } from "@/lib/likeService";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { entityType, entityId, userId } = await request.json();
    if (!entityType || !entityId || !userId) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    const isLiked = await LikeService.like(userId, entityType, entityId);
    const likeCount = await LikeService.findEntityLikeCount(
      entityType,
      entityId
    );
    return NextResponse.json({
      success: true,
      isLiked,
      likeCount,
    });
  } catch (error) {
    console.log("Like error:", error);
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 }
    );
  }
}
