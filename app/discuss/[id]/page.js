import { selectDiscussPostById } from "@/app/_lib/DiscussPostMapper";
import { selectUserById } from "@/app/_lib/UserMapper";
import PostReplys from "@/app/_components/PostReplys";
import PublishComment from "@/app/_components/PublishComment";
import { auth } from "@/app/_lib/auth";
import PostContent from "@/app/_components/PostContent";
import { getCommenttCount } from "@/app/_lib/CommentMapper";
import Pagination from "@/app/_components/Pagination";

async function page({ params }) {
  let { id } = await params;
  let post = await selectDiscussPostById(id);
  let user = await selectUserById(post.userId);
  const session = await auth();
  const userEmail = session?.user?.email;
  const commentCount = await getCommenttCount(id);

  return (
    <div className="main">
      {/* discuss post detail */}
      <PostContent user={user} post={post} />
      {/* comment */}
      <div className="container mt-3">
        {/* number of comments */}
        <div className="row">
          <div className="col-8">
            <h6>
              <b className="square"></b> <i>{post.commentCount}</i> comments
            </h6>
          </div>
          {/* <div className="col-4 text-right">
            <a href="#replyform" className="btn btn-primary btn-sm">
              Comment
            </a>
          </div> */}
        </div>

        {/* comment list */}
        <PostReplys id={id} offset={0} limit={5} />
      </div>
      {/* comment enter box */}
      <PublishComment postId={id} userEmail={userEmail} targetId={user[0].id} />

      <Pagination
        path={`/discuss/${id}`}
        postCount={commentCount}
        limit={5}
        current={0}
      />
    </div>
  );
}

export default page;
