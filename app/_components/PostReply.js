import Image from "next/image";
import styles from "./PostReply.module.css";
import { selectUserById } from "../_lib/UserMapper";
import CommentReply from "./CommentReply";
import { getReplyCount, selectCommentReplys } from "../_lib/CommentMapper";
import PublishReply from "./PublishReply";
import { auth } from "../_lib/auth";
import LikeButton from "./LikeButton";
import { LikeService } from "@/lib/likeService";
import { EntityType } from "@/lib/constants";

async function PostReply({ postComment, index }) {
  const user = await selectUserById(postComment.userId);
  const replyCount = await getReplyCount(postComment.id);
  const replys = await selectCommentReplys(postComment.id);
  const session = await auth();
  let userId = 0;
  if (session?.user?.id) {
    userId = session.user.id;
  }
  const likeCount = await LikeService.findEntityLikeCount(
    EntityType.COMMENT,
    postComment.id
  );
  const likeStatus =
    userId === 0
      ? 0
      : await LikeService.findEntityLikeStatus(
          userId,
          EntityType.COMMENT,
          postComment.id
        );

  return (
    <li className="media pb-3 pt-3 mb-3 border-bottom">
      <a href="profile.html">
        <Image
          src={user[0].image}
          className="align-self-start mr-4 rounded-circle user-header"
          alt="profile photo"
          width={50}
          height={50}
        />
      </a>
      <div className="media-body">
        <div className="mt-0">
          <span className="font-size-12 text-success">{user[0].name}</span>
          <span className={`badge badge-secondary float-right ${styles.floor}`}>
            {index + 1}#
          </span>
        </div>
        <div className="mt-2">{postComment.content}</div>
        <div className="mt-4 text-muted font-size-12">
          <span>
            published at{" "}
            <b>{new Date(postComment.created_at).toLocaleDateString()}</b>
          </span>
          <ul className="d-inline float-right">
            <li className="d-inline ml-2">
              <LikeButton
                entityType={EntityType.COMMENT}
                entityId={postComment.id}
                userId={userId}
                initialLikeCount={likeCount}
                initialLikeStatus={likeStatus}
              />
            </li>
            {/* <li className="d-inline ml-2">|</li>
            <li className="d-inline ml-2">
              <a href="#" className="text-primary">
                comment({replyCount})
              </a>
            </li> */}
          </ul>
        </div>

        {/* reply list */}
        <ul className="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
          {replys.map((reply) => (
            <CommentReply reply={reply} key={reply.id} />
          ))}
          {/* reply enter box */}
          <PublishReply
            commentId={postComment.id}
            postId={postComment.entityId}
            userId={userId}
            targetId={user[0].id}
          />
        </ul>
      </div>
    </li>
  );
}

export default PostReply;
