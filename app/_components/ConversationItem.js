import Image from "next/image";
import { selectUserById } from "../_lib/UserMapper";
import { readConversation } from "../_lib/MessageMapper";
import RefreshTrigger from "./RefreshTrigger";

async function ConversationItem({ conversation, userId }) {
  const fromUser = await selectUserById(conversation.fromId);
  const shouldMarkAsRead =
    userId !== fromUser[0].id && conversation.status !== 1;
  if (shouldMarkAsRead) {
    const tmpData = await readConversation(conversation.id);
  }
  return (
    <>
      {shouldMarkAsRead && <RefreshTrigger />}
      <li className="media pb-3 pt-3 mb-2">
        <a href="profile.html">
          <Image
            src={fromUser[0].image}
            className="mr-4 rounded-circle user-header"
            alt="user header"
            width={50}
            height={50}
          />
        </a>
        <div
          className="toast show d-lg-block"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="mr-auto">{fromUser[0].name}</strong>
            <small>
              {new Date(conversation.created_at).toLocaleDateString()}
            </small>
            {/* <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
          </div>
          <div className="toast-body">{conversation.content}</div>
        </div>
      </li>
    </>
  );
}

export default ConversationItem;
