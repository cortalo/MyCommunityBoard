import Image from "next/image";
import Link from "next/link";

function PostItem() {
  return (
    <ul className="list-unstyled">
      <li className="media pb-3 pt-3 mb-3 border-bottom">
        <Link href="/">
          <Image
            src="http://images.nowcoder.com/head/1t.png"
            className="mr-4 rounded-circle"
            alt="user profile photo"
            width={50}
            height={50}
          />
        </Link>
        <div className="media-body">
          <h6 className="mt-0 mb-3">
            <Link href="/">Title</Link>
          </h6>
          <div className="text-muted font-size-12">
            <u className="mr-3">username</u> published at <b>time</b>
            <ul className="d-inline float-right">
              <li className="d-inline ml-2">like (11)</li>
              <li className="d-inline ml-2">|</li>
              <li className="d-inline ml-2">replies (7)</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default PostItem;
