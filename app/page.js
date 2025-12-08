import Image from "next/image";
import Link from "next/link";
import Pagination from "./_components/Pagination";
import PostItem from "./_components/PostItem";
import Filter from "./_components/Filter";
import { getDiscussPosts } from "./_lib/DiscussPostMapper";

async function page() {
  let discussPosts = await getDiscussPosts();
  console.log(discussPosts);

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
        <Pagination />
      </div>
    </div>
  );
}

export default page;
