"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSocket from "./hook";
import { Skeleton } from "../UI/Skeleton";
import clsx from "clsx";
import Button from "../UI/button";

export default function Chat({
  room,
  ...props
}: {
  room: string;
  [key: string]: any;
}) {
  const { socket } = useSocket({ room });
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<{ msg: string; timeAt: string }[]>([]);
  const [SkeletonShow, setSkeletonShow] = useState<boolean>(true);
  useEffect(() => {
    if (socket) {
      socket.on("chatList", (data) => {
        setList((list) => {
          return [data, ...list];
        });
      });
    }
    if (socket) {
      socket.on("listInit", (data) => {
        setList(data);
        setSkeletonShow(false);
      });
    }
  }, [socket]);
  if (!socket) return;

  const send = async (e: any) => {
    e.preventDefault();
    if (text.trim() !== "") {
      console.log(room);
      socket.emit("send", {
        room,
        msg: text,
      });
      setText("");
    } else {
      alert("不能为空");
    }
  };

  return (
    <div className={clsx("mx-auto", props?.className)}>
      <div className="flex">
        {" "}
        <input
          type="text"
          className="border flex-1"
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") send(e);
          }}
          value={text}
        />{" "}
        <Button onClick={send}>Send</Button>
      </div>
      <div className="flex-grow">
        <ul className="w-auto border space-y-3 min-h-[400px] p-1">
          {list.length !== 0 &&
            list.map((item) => {
              return (
                <div key={item.timeAt} className="flex gap-2 ">
                  <div className="w-[30px] h-[30px] self-end">
                    <Image
                      width={30}
                      height={30}
                      src="https://avatars.githubusercontent.com/u/93917549?v=4"
                      alt="Dawn"
                      title="Dawn"
                      className="rounded-full "
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    {" "}
                    <header className=" space-x-2">
                      <span className="text-gray-700 font-semibold text-[14px]">
                        匿名用户
                      </span>
                      <span className="text-gray-400 text-[10px]">
                        {dayjs(item.timeAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </header>
                    <div className="text-sm w-auto inline-block  bg-blue-200 rounded p-1 text-wrap break-all overflow-hidden">
                      <p>{item.msg}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          {!SkeletonShow && list.length === 0 && (
            <li className="mt-[30%] text-center">
              <h1>暂无聊天记录</h1>
            </li>
          )}
          {SkeletonShow && (
            <>
              <Skeleton className="rounded-full w-[60px] h-[60px] " />
              <Skeleton className="w-[50%] h-5 " />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
