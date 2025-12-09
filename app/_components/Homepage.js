import {
  getDiscussPostCount,
  selectDiscussPosts,
} from "../_lib/DiscussPostMapper";
import Filter from "./Filter";
import Pagination from "./Pagination";
import PostItem from "./PostItem";

async function Homepage({ offset }) {
  let discussPosts = await selectDiscussPosts(0, offset * 10, 10);
  let postCount = await getDiscussPostCount(0);
  return (
    <div className="main">
      <div className="container">
        <div className="position-relative">
          <Filter />
          <button
            type="button"
            className="btn btn-primary btn-sm position-absolute rt-0"
            data-toggle="modal"
            data-target="#publishModal"
          >
            publish
          </button>
        </div>
        {/* pop up window for publish */}

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
