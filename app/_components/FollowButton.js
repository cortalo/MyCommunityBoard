"use client";

import { useState } from "react";
import { toggleFollow } from "../_lib/FollowAction";

function FollowButton({ initialStatus, entityType, entityId }) {
  const [isFollow, setIsFollow] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    const result = await toggleFollow(isFollow, entityType, entityId);
    if (result.success) {
      setIsFollow(result.newStatus);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      type="button"
      className={`btn ${
        isFollow ? "btn-secondary" : "btn-info"
      } btn-sm float-right mr-5 follow-btn`}
    >
      {`${isFollow ? "Followed" : "Follow"}`}
    </button>
  );
}

export default FollowButton;
