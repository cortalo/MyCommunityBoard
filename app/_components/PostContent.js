import styles from "./PostContent.module.css";
import Image from "next/image";

function PostContent({ user, post }) {
  return (
    <div className="container">
      {/* title */}
      <h6 className="mb-4">
        <Image
          src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"
          alt="discuss icon"
          height={22}
          width={25}
        />
        <span>{post.title}</span>
        <div className="float-right">
          <button type="button" className="btn btn-danger btn-sm">
            pin
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            feature
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            delete
          </button>
        </div>
      </h6>

      {/* author */}
      <div className="media pb-3 border-bottom">
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
          <div className="mt-0 text-warning">{user[0].name}</div>
          <div className="text-muted mt-3">
            published at <b>{new Date(post.created_at).toLocaleDateString()}</b>
            <ul className="d-inline float-right">
              <li className="d-inline ml-2">
                <a href="#" className="text-primary">
                  like 11
                </a>
              </li>
              <li className="d-inline ml-2">|</li>
              <li className="d-inline ml-2">
                <a href="#replyform" className="text-primary">
                  comment 7
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* discuss post content */}
      <div className={`mt-4 mb-3 ${styles.content}`}>{post.content}</div>
    </div>
  );
}

export default PostContent;
