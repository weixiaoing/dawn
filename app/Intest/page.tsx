"use client";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSocket from "./hook";

export default function Chat() {
  const { socket } = useSocket({ room: "Home" });
  const [text, setText] = useState<string>("");
  let [list, setList] = useState<
    { index: string; msg: string; commitAt: string }[]
  >([]);
  useEffect(() => {
    if (socket) {
      socket.on("chatList", (data) => {
        setList((list) => [...list, data]);
      });
    }
  }, [socket]);
  if (!socket) return;

  const send = async (e: any) => {
    e.preventDefault();
    if (text.trim() !== "") {
      socket.emit("send", {
        msg: text,
      });
      setText("");
    } else {
      alert("不能为空");
    }
  };

  return (
    <div className="mx-auto">
      {/* <h1 className="text-center">在线聊天室(beta)</h1> */}
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
        {
          <ul className="w-auto border space-y-3 min-h-[400px] p-1">
            {list.length !== 0 &&
              list.map((item) => {
                return (
                  <div key={item.index} className="flex gap-2 ">
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
                          {dayjs(item.commitAt).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </header>
                      <div className="text-sm w-auto inline-block  bg-blue-200 rounded p-1 text-wrap break-all overflow-hidden">
                        <p>{item.msg}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {list.length === 0 && (
              <li className="mt-[30%] text-center">
                <h1>暂无聊天记录</h1>
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  );
}
