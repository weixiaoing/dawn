"use client";

import { useMemo, useState } from "react";
import Comment from "./comment";
import Card from "../card";
import Button from "../button";
import MainComment, { mainCommentType } from "./mainComent";

export default function CommentList({
  comments,
}: {
  comments: mainCommentType[];
}) {
  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          return <MainComment key={comment.time} comment={comment} />;
        })}
    </>
  );
}
