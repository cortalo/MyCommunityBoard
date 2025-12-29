import Link from "next/link";
import { auth } from "../_lib/auth";
import {
  getConversationTotalUnreadCount,
  getNoticeTotalUnreadCount,
} from "../_lib/MessageMapper";
import Image from "next/image";

async function page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const userId = session.user.id;
  const conversationTotalUnreadCount = await getConversationTotalUnreadCount(
    userId
  );
  const noticeTotalUnreadCount = await getNoticeTotalUnreadCount(userId);
  return (
    <>
      <style>{`
        .main .nav .badge {
          position: absolute;
          top: -3px;
          left: 68px;
        }
        .main .media .badge {
          position: absolute;
          top: 12px;
          left: -3px;
        }
      `}</style>
      <div className="main">
        <div className="container">
          <div className="position-relative">
            {/* Options */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <Link className="nav-link position-relative" href="/letter">
                  Friends
                  {conversationTotalUnreadCount > 0 && (
                    <span className={`badge badge-danger`}>
                      {conversationTotalUnreadCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link position-relative active"
                  href="/notice"
                >
                  Notices
                  {noticeTotalUnreadCount > 0 && (
                    <span className={`badge badge-danger`}>
                      {noticeTotalUnreadCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Notice List */}
          <ul className="list-unstyled">
            {/* comment notice */}
            <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
              <span className="badge badge-danger">3</span>
              <Image
                src="http://static.nowcoder.com/images/head/reply.png"
                className="mr-4 user-header"
                alt="notice icon"
                width={80}
                height={80}
              />
              <div className="media-body">
                <h6 className="mt-0 mb-3">
                  <span>Comments</span>
                  <span className="float-right text-muted font-size-12">
                    2019-04-28 14:13:25
                  </span>
                </h6>
                <div>
                  <a href="#">
                    User <i>nowcoder</i> comments your <b>post</b> ...
                  </a>
                  <ul className="d-inline font-size-12 float-right">
                    <li className="d-inline ml-2">
                      <span className="text-primary">
                        <i>3</i> notices in total
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* like notice */}
            <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
              <span className="badge badge-danger">3</span>
              <Image
                src="http://static.nowcoder.com/images/head/like.png"
                className="mr-4 user-header"
                alt="notice icon"
                width={80}
                height={80}
              />
              <div className="media-body">
                <h6 className="mt-0 mb-3">
                  <span>like</span>
                  <span className="float-right text-muted font-size-12">
                    2019-04-28 14:13:25
                  </span>
                </h6>
                <div>
                  <a href="notice-detail.html">
                    user <i>nowcoder</i> likes your <b>post</b> ...
                  </a>
                  <ul className="d-inline font-size-12 float-right">
                    <li className="d-inline ml-2">
                      <span className="text-primary">
                        <i>3</i> notices in total
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* follow notice */}
            <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
              <span className="badge badge-danger">3</span>
              <Image
                src="http://static.nowcoder.com/images/head/follow.png"
                className="mr-4 user-header"
                alt="notice icon"
                width={80}
                height={80}
              />
              <div className="media-body">
                <h6 className="mt-0 mb-3">
                  <span>follow</span>
                  <span className="float-right text-muted font-size-12">
                    2019-04-28 14:13:25
                  </span>
                </h6>
                <div>
                  <a href="notice-detail.html">
                    user <i>nowcoder</i> follows you ...
                  </a>
                  <ul className="d-inline font-size-12 float-right">
                    <li className="d-inline ml-2">
                      <span className="text-primary">
                        <i>3</i> notices in total
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default page;
