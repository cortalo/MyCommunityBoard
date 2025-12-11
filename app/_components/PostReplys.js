import Image from "next/image";
import PostReply from "./PostReply";
import { selectPostComments } from "../_lib/CommentMapper";

async function PostReplys({ id }) {
  const postComments = await selectPostComments(id, 0, 10);
  return (
    <ul className="list-unstyled mt-4">
      {postComments.map((postComment, index) => (
        <PostReply
          postComment={postComment}
          index={index}
          key={postComment.id}
        />
      ))}
    </ul>
  );
}

export default PostReplys;
