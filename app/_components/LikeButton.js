"use client";

import { useState } from "react";

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
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ entityType, entityId, userId }),
      });

      const data = await response.json();
      if (data.success) {
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.log("Failed to like: ", error);
    } finally {
      setLoading(false);
    }
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
