import { LikeService } from "@/lib/likeService";
import { auth } from "../_lib/auth";
import { selectUserById } from "../_lib/UserMapper";
import styles from "./CommentReply.module.css";
import { EntityType } from "@/lib/constants";
import LikeButton from "./LikeButton";

async function CommentReply({ reply }) {
  const user = await selectUserById(reply.userId);
  let loginUserId = 0;
  const session = await auth();
  if (session?.user?.id) {
    loginUserId = session.user.id;
  }
  const likeCount = await LikeService.findEntityLikeCount(
    EntityType.COMMENT,
    reply.id
  );
  const likeStatus =
    loginUserId === 0
      ? 0
      : await LikeService.findEntityLikeStatus(
          loginUserId,
          EntityType.COMMENT,
          reply.id
        );
  return (
    <li className="pb-3 pt-3 mb-3 border-bottom">
      <div>
        <span>
          <b className="text-info">{user[0].name}</b>:&nbsp;&nbsp;
        </span>
        <span>{reply.content}</span>
      </div>
      <div className="mt-3">
        <span>{new Date(reply.created_at).toLocaleDateString()}</span>
        <ul className="d-inline float-right">
          <li className="d-inline ml-2">
            <LikeButton
              entityType={EntityType.COMMENT}
              entityId={reply.id}
              userId={loginUserId}
              initialLikeCount={likeCount}
              initialLikeStatus={likeStatus}
            />
          </li>
          {/* <li className="d-inline ml-2">|</li>
          <li className="d-inline ml-2">
            <a href="#huifu01" data-toggle="collapse" className="text-primary">
              reply
            </a>
          </li> */}
        </ul>
        <div id="huifu01" className="mt-4 collapse">
          <div>
            <input
              type="text"
              className={styles.inputsize}
              placeholder="reply to Mike Johnson"
            />
          </div>
          <div className="text-right mt-2">
            <button type="button" className="btn btn-primary btn-sm">
              reply
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CommentReply;
