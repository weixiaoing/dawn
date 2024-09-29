"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createContext } from "vm";
import { Skeleton } from "../UI/Skeleton";
import Button from "../UI/button";
import Input from "../UI/input";
import CommentList from "../comment/commentList";
import { CommentType } from "../comment/type";
import useSocket from "./hook";

export default function Chat({
  room,
  ...props
}: {
  room: string;
  [key: string]: any;
}) {
  const { socket } = useSocket({ room });
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<CommentType[]>([]);
  const [SkeletonShow, setSkeletonShow] = useState<boolean>(true);
  const SocketContext = createContext();

  useEffect(() => {
    if (socket) {
      socket.on("chatList", (data) => {
        console.log("i get", data);
        setList((list) => {
          return [data, ...list];
        });
      });
      socket.on("listInit", (data) => {
        setList(data);
        setSkeletonShow(false);
      });
      socket.on("subChatOut", (data) => {
        setList((list) => {
          return list.map((item) => {
            if (item._id === data.parentId) {
              return {
                ...item,
                replies: [...item.replies, data],
              };
            } else {
              return item;
            }
          });
        });
      });
    }
  }, [socket]);
  if (!socket) return;

  const send = async (e: any) => {
    e.preventDefault();

    if (text.trim() !== "") {
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
      <div className="border-blue-300 dark:bg-slate-700 dark:bg-white border p-2">
        <Input
          border={false}
          placeholder="请输入回复内容"
          type="textarea"
          className="min-h-[6rem] mx-h-[12rem] dark:bg-white p-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          value={text}
        ></Input>
        <footer className="flex flex-row-reverse ">
          <Button onClick={send} className="bg-blue-600 text-white">
            send
          </Button>
        </footer>
      </div>
      <div className="flex-grow">
        <ul className="w-auto  space-y-3 min-h-[400px] p-1">
          {list.length !== 0 && (
            // list.map((item) => {
            //   return (
            //     <div key={item.timeAt} className="flex gap-2 ">
            //       <div className="w-[30px] h-[30px] self-end">
            //         <Image
            //           width={30}
            //           height={30}
            //           src="https://avatars.githubusercontent.com/u/93917549?v=4"
            //           alt="Dawn"
            //           title="Dawn"
            //           className="rounded-full "
            //         />
            //       </div>

            //       <div className="flex-1 space-y-1">
            //         {" "}
            //         <header className=" space-x-2">
            //           <span className="text-gray-700 font-semibold text-[14px]">
            //             匿名用户
            //           </span>
            //           <span className="text-gray-400 text-[10px]">
            //             {dayjs(item.timeAt).format("YYYY-MM-DD HH:mm:ss")}
            //           </span>
            //         </header>
            //         <div className="text-sm w-auto inline-block  bg-blue-200 rounded p-1 text-wrap break-all overflow-hidden">
            //           <p>{item.msg}</p>
            //         </div>
            //       </div>
            //     </div>
            //   );
            // })
            <CommentList socket={socket} comments={list} />
          )}
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
