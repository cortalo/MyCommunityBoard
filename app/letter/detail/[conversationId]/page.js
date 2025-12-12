import ConversationItem from "@/app/_components/ConversationItem";
import { auth } from "@/app/_lib/auth";
import { selectByConversationId } from "@/app/_lib/MessageMapper";
import { selectUserByEmail, selectUserById } from "@/app/_lib/UserMapper";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page({ params }) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const user = await selectUserByEmail(session.user.email);
  const userId = user[0].id;

  const { conversationId } = await params;
  const ids = conversationId.split("_");
  const id1 = parseInt(ids[0]);
  const id2 = parseInt(ids[1]);
  if (id1 !== userId && id2 !== userId) {
    redirect("/");
  }
  const conversations = await selectByConversationId(conversationId, 0, 10);
  const otherUser = await selectUserById(userId === id1 ? id2 : id1);

  return (
    <div className="main">
      <div className="container">
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
              className="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#sendModal"
            >
              Send PM
            </button>
          </div>
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
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      To:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      defaultValue="username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">
                      Content:
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      rows="10"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" id="sendBtn">
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
                Success!
              </div>
            </div>
          </div>
        </div>

        {/* PM list */}
        <ul className="list-unstyled mt-4">
          {conversations.map((conversation) => (
            <ConversationItem
              conversation={conversation}
              key={conversation.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
