import { EntityType } from "@/lib/constants";
import LikeButton from "./LikeButton";
import styles from "./PostContent.module.css";
import Image from "next/image";
import { auth } from "../_lib/auth";
import { selectUserByEmail } from "../_lib/UserMapper";
import { LikeService } from "@/lib/likeService";

async function PostContent({ user, post }) {
  let userId = 0;
  const session = await auth();
  if (session?.user?.email) {
    const loginUser = await selectUserByEmail(session.user.email);
    userId = loginUser[0].id;
  }
  const likeCount = await LikeService.findEntityLikeCount(
    EntityType.POST,
    post.id
  );
  const likeStatus =
    userId === 0
      ? 0
      : await LikeService.findEntityLikeStatus(
          userId,
          EntityType.POST,
          post.id
        );
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
                <LikeButton
                  entityType={EntityType.POST}
                  entityId={post.id}
                  userId={userId}
                  initialLikeCount={likeCount}
                  initialLikeStatus={likeStatus}
                />
              </li>
              {/* <li className="d-inline ml-2">|</li>
              <li className="d-inline ml-2">
                <span href="#replyform" className="text-primary">
                  comment {post.commentCount}
                </span>
              </li> */}
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
