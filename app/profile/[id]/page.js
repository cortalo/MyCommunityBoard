import FollowButton from "@/app/_components/FollowButton";
import { auth } from "@/app/_lib/auth";
import { selectUserById } from "@/app/_lib/UserMapper";
import { EntityType } from "@/lib/constants";
import { FollowService } from "@/lib/followService";
import { LikeService } from "@/lib/likeService";
import Image from "next/image";
import Link from "next/link";

async function page({ params }) {
  const { id } = await params;
  const session = await auth();
  const user = await selectUserById(id);
  const likeCount = await LikeService.findUserLikeCount(user[0].id);
  const followeeCount = await FollowService.findFolloweeCount(
    user[0].id,
    EntityType.USER
  );
  const followerCount = await FollowService.findFollowerCount(
    EntityType.USER,
    user[0].id
  );

  let followStatus = false;
  if (session) {
    followStatus = await FollowService.hasFollowed(
      session.user.id,
      EntityType.USER,
      id
    );
  }
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
              {session && session?.user?.id != id && (
                <FollowButton
                  initialStatus={followStatus}
                  entityType={EntityType.USER}
                  entityId={id}
                />
              )}
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
                  {followeeCount}
                </a>
              </span>
              <span className="ml-4">
                Follower:{" "}
                <a className="text-primary" href="follower.html">
                  {followerCount}
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
