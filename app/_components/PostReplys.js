import Image from "next/image";
import PostReply from "./PostReply";
import { selectPostComments } from "../_lib/CommentMapper";

async function PostReplys({ id, offset, limit }) {
  const postComments = await selectPostComments(id, offset, limit);
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
