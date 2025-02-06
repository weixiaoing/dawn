"use client";
import { useEffect, useState } from "react";
import useSocket from "../chat/hook";
// import type { CommentBaseProps } from "./types";

import CommentBox from "./ComentBox";
import Comments from "./Comments";
import { CommentType } from "./type";

// import { CommentBoxRoot } from "./CommentBox/Root";
// import { Comments } from "./Comments";
// import { CommentSkeleton } from "./CommentSkeleton";

// export const CommentAreaRoot: FC<
//   CommentBaseProps & {
//     allowComment: boolean;
//   }
// > = (props) => {
//   const { allowComment, refId } = props;
//   // 兜下后端的数据，默认开
//   if (!allowComment && typeof allowComment !== "undefined") {
//     return (
//       <p className="mt-[7.1rem] text-center text-xl font-medium">评论已关闭</p>
//     );
//   }

//   return (
//     <div className="relative mt-12">
//       <CommentBoxRoot refId={refId} />

//       <div className="h-12" />
//       <LazyLoad placeholder={<CommentSkeleton />} triggerOnce>
//         <Comments refId={refId} />
//       </LazyLoad>
//     </div>
//   );
// };

export default function CommentRoot({
  room,
}: {
  room?: string;
  className?: string;
  // socket: Socket;
}) {
  const { socket } = useSocket({ room });
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    if (socket) {
      socket.on("chatList", (data) => {
        console.log("i get", data);
        setComments((list) => {
          return [data, ...list];
        });
      });
      socket.on("listInit", (data) => {
        setComments(data);
        console.log("link room sucess ", data);
        // setSkeletonShow(false);
      });
      socket.on("subChatOut", (data) => {
        console.log("subChatOut", data);
        setComments((list) => {
          return list.map((item) => {
            if (item._id === data.levelIdArray?.[0]) {
              return {
                ...item,
                replies: [data, ...item.replies],
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
  return (
    <>
      <div>
        <CommentBox
          onSubmit={(message) => {
            if (message.content.trim() !== "") {
              console.log(message);
              socket.emit("send", {
                room,
                message,
              });
            } else {
              alert("不能为空");
            }
          }}
        ></CommentBox>
        <Comments
          reply={(data) => {
            console.log("replyData", data);
            socket.emit("reply", {
              postId: room,
              ...data,
            });
          }}
          data={comments}
        ></Comments>
      </div>
    </>
  );
}
