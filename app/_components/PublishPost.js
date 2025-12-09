"use client";

import { useState } from "react";
import Filter from "./Filter";

function PublishPost({ session }) {
  const [isOpen, setIsOpen] = useState(false);
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
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Content:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    rows="15"
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
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" id="publishBtn">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublishPost;
