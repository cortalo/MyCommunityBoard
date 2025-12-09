import { auth } from "../_lib/auth";
import {
  getDiscussPostCount,
  selectDiscussPosts,
} from "../_lib/DiscussPostMapper";
import Filter from "./Filter";
import Pagination from "./Pagination";
import PostItem from "./PostItem";
import PublishPost from "./PublishPost";

async function Homepage({ offset }) {
  const session = await auth();
  let discussPosts = await selectDiscussPosts(0, offset * 10, 10);
  let postCount = await getDiscussPostCount(0);
  return (
    <div className="main">
      <div className="container">
        <PublishPost session={session} />
        <ul className="list-unstyled">
          {discussPosts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </ul>
        <Pagination
          path="/index"
          postCount={postCount}
          limit={10}
          current={offset}
        />
      </div>
    </div>
  );
}

export default Homepage;
