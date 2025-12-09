"use client";

import { useState } from "react";
import Filter from "./Filter";
import { createPost } from "../_lib/DiscussPostMapper";

function PublishPost({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const result = await createPost(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setIsOpen(false);
      e.target.reset(); // Clear form
    }
  }

  return (
    <>
      <div className="position-relative">
        <Filter />
        {session && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn btn-primary btn-sm position-absolute rt-0"
            data-toggle="modal"
            data-target="#publishModal"
          >
            publish
          </button>
        )}
      </div>
      {/* pop up window for publish */}
      <div
        className={`modal fade ${isOpen ? "show d-block" : ""}`}
        id="publishModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="publishModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="publishModalLabel">
                Publish New Post
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setIsOpen(false)}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="publishForm">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Content:
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows="15"
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="publishForm"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublishPost;
