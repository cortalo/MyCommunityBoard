"use client";

import { useState } from "react";
import styles from "./PublishComment.module.css";
import { addComment } from "../_lib/CommentMapper";
import { EntityType } from "@/lib/constants";
function PublishComment({ postId, session, targetId }) {
  const login = session != null;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("postId", targetId);
    formData.append("entityType", EntityType.POST);
    formData.append("entityId", postId);
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
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className={styles.replyform}>
        <p className="mt-3">
          <a name={styles.replyform}></a>
          <textarea
            placeholder={
              login
                ? "Please enter your comment."
                : "Login to comment the post."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading || !login}
            required
          ></textarea>
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={loading || !login}
          >
            {loading ? "Posting..." : "Comment"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default PublishComment;
