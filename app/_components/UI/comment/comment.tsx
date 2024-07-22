"use client";
import { useState } from "react";
import Card from "../card";
import Image from "next/image";
import Avatar from "../avatar";
import Button from "../button";
import Input from "../input";
export type CommentType = {
  avatar?: string;
  name?: string;
  content?: string;
  time?: string;
};
type props = {
  border?: boolean;
  children?: React.ReactNode;
  submit?: (content: string) => void;
} & CommentType;
export default function Comment({
  avatar = "https://github.com/shadcn.png",
  name = "匿名用户",
  content = "test",
  time = "刚刚",
  border = false,
  children,
}: props) {
  const [replyShow, setReplyShow] = useState(false);

  return (
    <Card className="px-0" border={border}>
      <main className="flex space-x-1">
        <Avatar src={avatar} alt={name} className="size-2" />
        <div className="flex-1 p-2">
          <header className="space-x-1 flex items-center justify-between">
            <span className="font-semibold">{name}</span>
            <span className="text-gray-400 text-[0.8rem]">{time}</span>
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
              <div className="border-blue-300  border p-2">
                <Input
                  border={false}
                  placeholder="请输入回复内容"
                  type="textarea"
                  className="min-h-[6rem] mx-h-[12rem]"
                ></Input>
                <footer className="flex flex-row-reverse ">
                  <Button className="bg-blue-600 text-white">send</Button>
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
