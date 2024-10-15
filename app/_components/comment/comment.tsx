"use client";
import { BiMessageRoundedDetail } from "react-icons/bi";

import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Avatar from "../UI/avatar";
import Button from "../UI/button";
import Input from "../UI/input";
import { CommentType } from "./type";

type props = {
  border?: boolean;
  children?: React.ReactNode;
  socket?: Socket;
  submit?: (content: string) => void;
  noreplay?: boolean;
} & CommentType;
export default function Comment({
  socket,
  avatar = "https://github.com/shadcn.png",
  name = "匿名用户",
  content = "test",
  _id,
  createdAt = "刚刚",
  border = false,
  postId,
  children,
  noreplay = false,
}: props) {
  const [replyShow, setReplyShow] = useState(false);
  const [replayText, setReplayText] = useState("");
  const [replayout, setReplayOut] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  if (!socket) return;
  const replay = () => {
    socket.emit("replay", {
      parentId: _id,
      postId,
      content: replayText,
    });
    setReplayText("");
    setReplyShow(false);
  };
  const handleClickOutside = (event: any) => {
    // 检查点击事件的目标是否不是目标元素或其子元素
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // 如果点击在外部，则关闭元素
      setReplyShow(false);
    }
  };

  return (
    <div>
      <main className="flex space-x-1">
        <div className="self-end">
          <Avatar src={avatar} alt={name} className="size-2" />
        </div>
        <div className="flex-1 p-2">
          <header className="space-x-1 flex items-center ">
            <h2 className="text-[20px] font-semibold">{name}</h2>
            <span className="text-gray-400 text-[0.8rem]">
              {dayjs(createdAt).format("YYYY 年 MM 月 DD 日 ")}
            </span>
          </header>
          <p
            onMouseEnter={() => setReplayOut(true)}
            onMouseLeave={() => setReplayOut(false)}
            className=" box-border bg-zinc-600/5  dark:bg-zinc-400 inline-block relative rounded-lg rounded-tl-sm p-2 py-[1px] text-zinc-800 dark:text-zinc-200"
          >
            {content}

            <span className="absolute bottom-0 right-0 text-[0.7rem]">
              {!noreplay && replayout && (
                <Button
                  onClick={() => {
                    setReplyShow((show) => !show);
                  }}
                >
                  <div className="border bg-zinc-600/5  dark:bg-zinc-400  translate-x-[100%] translate-y-[100%] border-gray-400 rounded-full ">
                    <BiMessageRoundedDetail />
                  </div>
                </Button>
              )}
            </span>
          </p>
        </div>
      </main>
      <footer>
        {replyShow && (
          <div ref={inputRef} className="border-blue-300  border">
            <Input
              border={false}
              placeholder="请输入回复内容"
              type="textarea"
              className="min-h-[6rem] mx-h-[12rem]"
              value={replayText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReplayText(e.target.value);
              }}
            ></Input>
            <footer className="flex flex-row-reverse ">
              <Button
                onClick={() => {
                  replay();
                }}
                className="bg-blue-600 text-white"
              >
                send
              </Button>
            </footer>
          </div>
        )}
        <div className="ml-4">{children}</div>
      </footer>
    </div>
  );
}
