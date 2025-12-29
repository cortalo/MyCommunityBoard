import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import {
  getConversationTotalUnreadCount,
  getNoticeTotalUnreadCount,
  selectConversations,
} from "../_lib/MessageMapper";
import LetterConversationItem from "../_components/LetterConversationItem";
import Link from "next/link";

async function page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const userId = session.user.id;
  const conversations = await selectConversations(userId, 0, 10);
  const conversationTotalUnreadCount = await getConversationTotalUnreadCount(
    userId
  );
  const noticeTotalUnreadCount = await getNoticeTotalUnreadCount(userId);
  return (
    <>
      <style>{`
        .main .nav .badge {
          position: absolute;
          top: -3px;
          left: 68px;
        }
        .main .media .badge {
          position: absolute;
          top: 12px;
          left: -3px;
        }
        .toast {
          max-width: 100%;
          width: 80%;
        }
      `}</style>
      <div className="main">
        <div className="container">
          <div className="position-relative">
            {/* options */}
            <ul className={`nav nav-tabs mb-3`}>
              <li className="nav-item">
                <Link
                  className="nav-link position-relative active"
                  href="/letter"
                >
                  Friends
                  {conversationTotalUnreadCount > 0 && (
                    <span className={`badge badge-danger`}>
                      {conversationTotalUnreadCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" href="/notice">
                  Notices
                  {noticeTotalUnreadCount > 0 && (
                    <span className={`badge badge-danger`}>
                      {noticeTotalUnreadCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-primary btn-sm position-absolute rt-0"
              data-toggle="modal"
              data-target="#sendModal"
            >
              Send PM
            </button>
          </div>

          {/* popup window */}
          <div
            className="modal fade"
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
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        To：
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message-text" className="col-form-label">
                        Content：
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        rows="10"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="sendBtn"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt window */}
          <div
            className="modal fade"
            id="hintModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="hintModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="hintModalLabel">
                    Prompt
                  </h5>
                </div>
                <div className="modal-body" id="hintBody">
                  Success
                </div>
              </div>
            </div>
          </div>

          {/* PM list */}
          <ul className="list-unstyled">
            {(await conversations).map((convsersation) => (
              <LetterConversationItem
                conversation={convsersation}
                userId={userId}
                key={convsersation.id}
              />
            ))}
          </ul>

          {/* pagination */}
        </div>
      </div>
    </>
  );
}

export default page;
