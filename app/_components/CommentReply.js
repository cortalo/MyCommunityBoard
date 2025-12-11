import { selectUserById } from "../_lib/UserMapper";
import styles from "./CommentReply.module.css";

async function CommentReply({ reply }) {
  const user = await selectUserById(reply.userId);
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
            <a href="#" className="text-primary">
              like(1)
            </a>
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
