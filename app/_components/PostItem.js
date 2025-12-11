import Image from "next/image";
import Link from "next/link";
import { selectUserById } from "../_lib/UserMapper";

async function PostItem({ post }) {
  let users = await selectUserById(post.userId);
  return (
    <li className="media pb-3 pt-3 mb-3 border-bottom">
      <Link href="/">
        <Image
          src={users[0].image}
          className="mr-4 rounded-circle"
          alt="user profile photo"
          width={50}
          height={50}
        />
      </Link>
      <div className="media-body">
        <h6 className="mt-0 mb-3">
          <Link href={`/discuss/${post.id}`}>{post.title}</Link>
        </h6>
        <div className="text-muted font-size-12">
          <u className="mr-3">{users[0].name}</u>published at{" "}
          <b>{new Date(post.created_at).toLocaleDateString()}</b>
          <ul className="d-inline float-right">
            <li className="d-inline ml-2">like (11)</li>
            <li className="d-inline ml-2">|</li>
            <li className="d-inline ml-2">replies ({post.commentCount})</li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default PostItem;
