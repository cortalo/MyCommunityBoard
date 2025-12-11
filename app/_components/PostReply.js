import Image from "next/image";
import styles from "./PostReply.module.css";
import { selectUserById } from "../_lib/UserMapper";
import CommentReply from "./CommentReply";
import { selectCommentReplys } from "../_lib/CommentMapper";

async function PostReply({ postComment, index }) {
  const user = await selectUserById(postComment.userId);
  const replys = await selectCommentReplys(postComment.id);
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
              <a href="#" className="text-primary">
                like(1)
              </a>
            </li>
            <li className="d-inline ml-2">|</li>
            <li className="d-inline ml-2">
              <a href="#" className="text-primary">
                comment(2)
              </a>
            </li>
          </ul>
        </div>

        {/* reply list */}
        <ul className="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
          {replys.map((reply) => (
            <CommentReply reply={reply} key={reply.id} />
          ))}
          {/* reply enter box */}
          <li className="pb-3 pt-3">
            <div>
              <input
                type="text"
                className={styles.inputsize}
                placeholder="please enter your reply."
              />
            </div>
            <div className="text-right mt-2">
              <button type="button" className="btn btn-primary btn-sm">
                reply
              </button>
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
}

export default PostReply;
