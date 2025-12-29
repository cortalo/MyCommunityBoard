import { selectUserById } from "@/app/_lib/UserMapper";
import { LikeService } from "@/lib/likeService";
import Image from "next/image";
import Link from "next/link";

async function page({ params }) {
  const { id } = await params;
  const user = await selectUserById(id);
  const likeCount = await LikeService.findUserLikeCount(user[0].id);

  return (
    <div className="main">
      <div className="container">
        {/* Options */}
        <div className="position-relative">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="profile.html">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="my-post.html">
                My Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="my-reply.html">
                My replies
              </a>
            </li>
          </ul>
        </div>

        {/* Profile */}
        <div className="media mt-5">
          <Image
            src={user[0].image}
            className="align-self-start mr-4 rounded-circle user-header"
            alt="profile photo"
            width={50}
            height={50}
          />
          <div className="media-body">
            <h5 className="mt-0 text-warning">
              <span>{user[0].name}</span>
              <button
                type="button"
                className="btn btn-info btn-sm float-right mr-5 follow-btn"
              >
                follow
              </button>
            </h5>
            <div className="text-muted mt-3">
              <span>
                Registered at{" "}
                <i className="text-muted">
                  {new Date(user[0].created_at).toLocaleDateString()}
                </i>
              </span>
            </div>
            <div className="text-muted mt-3 mb-5">
              <span>
                Followee:{" "}
                <a className="text-primary" href="followee.html">
                  5
                </a>
              </span>
              <span className="ml-4">
                Follower:{" "}
                <a className="text-primary" href="follower.html">
                  123
                </a>
              </span>
              <span className="ml-4">
                Get <i className="text-danger">{likeCount}</i> likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
