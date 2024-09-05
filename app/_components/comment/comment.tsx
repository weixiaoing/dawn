"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../UI/card";
import Image from "next/image";
import Avatar from "../UI/avatar";
import Button from "../UI/button";
import Input from "../UI/input";
import { CommentType } from "./type";
import dayjs from "dayjs";
import { Socket } from "socket.io-client";

type props = {
  border?: boolean;
  children?: React.ReactNode;
  socket?: Socket;
  submit?: (content: string) => void;
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
}: props) {
  const [replyShow, setReplyShow] = useState(false);
  const [replayText, setReplayText] = useState("");

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
    <Card className="px-0" border={border}>
      <main className="flex space-x-1">
        <Avatar src={avatar} alt={name} className="size-2" />
        <div className="flex-1 p-2">
          <header className="space-x-1 flex items-center justify-between">
            <span className="font-semibold">{name}</span>
            <span className="text-gray-400 text-[0.8rem]">
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </header>
          <p className="bg-zinc-600/5 dark:bg-zinc-500/20 dark:bg-zinc-400 inline-block rounded-lg rounded-tl-sm p-2 text-zinc-800 dark:text-zinc-200">
            {content}
          </p>

          <footer>
            <div className="flex text-gray-400 text-[0.7rem]">
              {/* <Button>
                <span>love</span>
              </Button>
              <Button>
                <span>save</span>
              </Button> */}
              <Button
                onClick={() => {
                  setReplyShow((show) => !show);
                }}
              >
                <span>Replay</span>
              </Button>
            </div>
            {replyShow && (
              <div
                ref={inputRef}
                onBlur={() => setReplyShow((show) => !show)}
                className="border-blue-300  border p-2"
              >
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
            {children}
          </footer>
        </div>
      </main>
    </Card>
  );
}
