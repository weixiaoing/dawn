"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import useSocket from "./hook";

export default function Chat() {
  const { socket } = useSocket();
  const [text, setText] = useState<string>("");
  let [list, setList] = useState([]);
  const send = (text = "") => {
    socket.emit("send", {
      msg: text,
    });
  };

  socket.on("chatList", (array) => {
    console.log(array, "array");
    setList(array);
  });
  return (
    <div className="mx-auto">
      <h1 className="mx-auto">Chat</h1>
      <div className="flex-grow">
        <ul className="w-auto border h-72">
          {list &&
            list.map((item) => {
              return <li key={item}>{item}</li>;
            })}
        </ul>
      </div>
      <input
        type="text"
        className="border"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => send(text)}>Send</Button>
    </div>
  );
}
