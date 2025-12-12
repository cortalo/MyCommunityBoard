"use client";
import Link from "next/link";
import { useState } from "react";
import { createMessage } from "../_lib/MessageMapper";

function PublishConversation({ otherUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const result = await createMessage(formData);

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
      <div className="row">
        <div className="col-8">
          <h6>
            <b className="square"></b> Private Messages from{" "}
            <i className="text-success">{otherUser[0].name}</i>
          </h6>
        </div>
        <div className="col-4 text-right">
          <Link
            type="button"
            className="btn btn-secondary btn-sm"
            href={"/letter"}
          >
            back
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#sendModal"
          >
            Send PM
          </button>
        </div>
      </div>
      {/* pop up window */}
      <div
        className={`modal fade ${isOpen ? "show d-block" : ""}`}
        id="sendModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Send PM
              </h5>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                disabled={loading}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="publishForm">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    To:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="toEmail"
                    name="toEmail"
                    defaultValue={otherUser[0].email}
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
                    rows="10"
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
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublishConversation;
