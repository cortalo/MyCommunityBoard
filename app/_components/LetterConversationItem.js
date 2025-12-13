import Image from "next/image";
import { selectUserById } from "../_lib/UserMapper";
import Link from "next/link";
import {
  getConversationCount,
  getConversationUnreadCount,
} from "../_lib/MessageMapper";

async function LetterConversationItem({ conversation, user }) {
  const targetId =
    user.id == conversation.fromId ? conversation.toId : conversation.fromId;

  const targetUser = await selectUserById(targetId);
  const conversationCount = await getConversationCount(
    conversation.conversationId
  );
  const conversationUnreadCount = await getConversationUnreadCount(
    conversation.conversationId,
    targetId
  );
  return (
    <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
      {conversationUnreadCount > 0 && (
        <span className="badge badge-danger">{conversationUnreadCount}</span>
      )}
      <a href="profile.html">
        <Image
          src={targetUser[0].image}
          className="mr-4 rounded-circle user-header"
          alt="user header"
          width={50}
          height={50}
        />
      </a>
      <div className="media-body">
        <h6 className="mt-0 mb-3">
          <span className="text-success">{targetUser[0].name}</span>
          <span className="float-right text-muted font-size-12">
            {new Date(conversation.created_at).toLocaleDateString()}
          </span>
        </h6>
        <div>
          <Link href={`/letter/detail/${conversation.conversationId}`}>
            {conversation.content}
          </Link>
          <ul className="d-inline font-size-12 float-right">
            <li className="d-inline ml-2">
              <a href="#" className="text-primary">
                <i>{conversationCount}</i> conversations in total
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default LetterConversationItem;
