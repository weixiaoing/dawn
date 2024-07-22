import { useState } from "react";
import Button from "../button";
import Comment, { CommentType } from "./comment";
export type mainCommentType = {
  subComment?: CommentType[];
} & CommentType;
export default function MainComment({ comment }: { comment: mainCommentType }) {
  const [unfold, setUnfold] = useState(false);
  return (
    <Comment content={comment.content}>
      {comment.subComment && (
        <div className="overflow-y-scroll max-h-80vh">
          {comment.subComment.map((subComment, index) => {
            return <Comment content={subComment.content} key={index} />;
          })}
          {
            <footer className="text-gray-400">
              <span>共{comment.subComment.length}条评论</span>
              <Button
                onClick={() => setUnfold((unfold) => !unfold)}
                className="ml-2"
              >
                {unfold ? "收起" : "展开"}
              </Button>
            </footer>
          }
        </div>
      )}
    </Comment>
  );
}
