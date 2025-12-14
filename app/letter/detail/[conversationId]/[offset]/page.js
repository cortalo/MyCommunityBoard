import ConversationItem from "@/app/_components/ConversationItem";
import Pagination from "@/app/_components/Pagination";
import PublishConversation from "@/app/_components/PublishConversation";
import { auth } from "@/app/_lib/auth";
import {
  getConversationCount,
  selectByConversationId,
} from "@/app/_lib/MessageMapper";
import { selectUserById } from "@/app/_lib/UserMapper";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page({ params }) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const userId = session.user.id;

  const { conversationId, offset } = await params;
  const ids = conversationId.split("_");
  const id1 = parseInt(ids[0]);
  const id2 = parseInt(ids[1]);
  if (id1 !== userId && id2 !== userId) {
    redirect("/");
  }
  const conversations = await selectByConversationId(
    conversationId,
    5 * offset,
    5
  );
  const otherUser = await selectUserById(userId === id1 ? id2 : id1);
  const conversationCount = await getConversationCount(conversationId);

  return (
    <div className="main">
      <div className="container">
        <PublishConversation otherUser={otherUser} />
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
              userId={userId}
            />
          ))}
        </ul>
      </div>
      <Pagination
        path={`/letter/detail/${conversationId}`}
        postCount={conversationCount}
        limit={5}
        current={offset}
      />
    </div>
  );
}

export default page;
