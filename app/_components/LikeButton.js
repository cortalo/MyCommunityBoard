"use client";

import { useState } from "react";
import { toggleLike } from "../_lib/LikeAction";

function LikeButton({
  entityType,
  entityId,
  userId,
  initialLikeCount,
  initialLikeStatus,
}) {
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [isLiked, setIsLiked] = useState(initialLikeStatus === 1);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    const result = await toggleLike(entityType, entityId);
    if (result.success) {
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading || userId === 0}
      className="text-primary"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: loading || userId === 0 ? "not-allowed" : "pointer",
        textDecoration: "none",
        font: "inherit",
        color: "inherit",
      }}
    >
      {`${isLiked ? "❤️" : "🤍"}`} {likeCount}
    </button>
  );
}

export default LikeButton;
