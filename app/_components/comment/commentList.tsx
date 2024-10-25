"use client";

import { useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import Comment from "./comment";
import { CommentType } from "./type";
function MainComment({
  socket,
  comment,
}: {
  socket: Socket;
  comment: CommentType;
}) {
  const [unfold, setUnfold] = useState(false);
  const renderList = useMemo(() => {
    // if (unfold) {
    //   return comment.replies;
    // } else {
    //   return comment.replies.slice(0, 2);
    // }
    return comment.replies;
  }, [comment.replies]);
  return (
    <Comment socket={socket} {...comment}>
      {comment.replies && (
        <div className="overflow-y-scroll max-h-80vh">
          {renderList.map((replay, index) => {
            return (
              <Comment noreplay socket={socket} {...replay} key={replay._id} />
            );
          })}
          {/* {
            <footer className="text-gray-400">
              <span>共{comment.replies.length}条评论</span>
              <Button
                onClick={() =>
                  setUnfold((unfold) => {
                    console.log(comment);

                    return !unfold;
                  })
                }
                className="ml-2"
              >
                {unfold ? "收起" : "展开"}
              </Button>
            </footer>
          } */}
        </div>
      )}
    </Comment>
  );
}
export default function CommentList({
  socket,
  comments,
}: {
  comments: CommentType[];
  socket: Socket;
}) {
  return (
    <>
      {comments &&
        comments.map((comment) => {
          return (
            <MainComment socket={socket} key={comment._id} comment={comment} />
          );
        })}
    </>
  );
}
