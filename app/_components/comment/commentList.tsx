"use client";

import { useState } from "react";
import { CommentType } from "./type";
import Comment from "./comment";
import Button from "../UI/button";
import { Socket } from "socket.io-client";
function MainComment({
  socket,
  comment,
}: {
  socket: Socket;
  comment: CommentType;
}) {
  const [unfold, setUnfold] = useState(false);
  return (
    <Comment socket={socket} {...comment}>
      {comment.replies && (
        <div className="overflow-y-scroll max-h-80vh">
          {comment.replies.map((replay, index) => {
            return <Comment socket={socket} {...replay} key={replay._id} />;
          })}
          {
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
          }
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
