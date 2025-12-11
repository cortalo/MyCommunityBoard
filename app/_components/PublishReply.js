"use client";

import { useState } from "react";
import styles from "./PublishComment.module.css";
import { addComment } from "../_lib/CommentMapper";

function PublishReply({ commentId, postId, userEmail, targetId }) {
  const login = userEmail ? true : false;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("userEmail", userEmail);
    formData.append("entityType", 1);
    formData.append("entityId", commentId);
    formData.append("targetId", targetId);
    formData.append("content", content);
    formData.append("status", 0);

    const result = await addComment(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setContent("");
    }
    setLoading(false);
  };

  return (
    <li className="pb-3 pt-3">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className={styles.inputsize}
            placeholder={
              login
                ? "Please enter your reply."
                : "Login to reply to the comment."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading || !login}
            required
          />
        </div>
        <div className="text-right mt-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={loading || !login}
          >
            {loading ? "Posting..." : "reply"}
          </button>
        </div>
      </form>
    </li>
  );
}

export default PublishReply;
