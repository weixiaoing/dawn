import { io } from "socket.io-client";

export default function useSocket() {
  const socket = io("ws://localhost:4000");
  socket.on("connect", () => {
    console.log(socket.id, "连接成功");
  });
  socket.on("disconnect", (reason) => {
    console.log("连接已断开");
    if (
      reason !== "io server disconnect" &&
      reason !== "io client disconnect"
    ) {
      console.log("重新连接中...");
    }
  });
  return {
    socket,
  };
}
