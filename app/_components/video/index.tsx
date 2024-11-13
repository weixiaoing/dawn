"use client";
import { BiTransfer } from "react-icons/bi";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

import useMediaStream from "@/_components/_hooks/useMedia";
import useSocket from "@/_components/_hooks/useSocket";
import clsx from "clsx";
import Button from "../UI/button";

export default function Video() {
  const cache = useRef(false);
  const socket = useSocket();
  const [errorSetting, setErrorSetting] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const { mediaStream: Stream, stopMediaStream } = useMediaStream();
  const [linked, setLinked] = useState(false);
  const [videoChanged, setVideoChanged] = useState(false);
  const hangDown = () => {
    if (socket.current)
      socket.current.emit("hang-down-server", { roomId: "Home" });
  };
  const pushStream = async (
    stream: MediaStream,
    socket: Socket,
    roomId = "Home"
  ) => {
    const configuration = {
      iceServers: [
        {
          urls: process.env.NEXT_PUBLIC_TURN_URL || "turn:dawnot.online:3478", // TURN服务器地址，可能包含端口号
          username: "username", // TURN服务器的用户名
          credential: "password", // TURN服务器的密码
        },
        // { urls: "stun:stun.l.google.com:19302" },
      ],
    };
    const peer = new RTCPeerConnection(configuration);
    socket.on("hang-down", () => {
      console.log("yes quit");
      peerVideo.current!.srcObject = null;
    });

    const peerStream = new MediaStream();
    // 添加各种本地流到peer连接上
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
    // 监听接收事件,将接收到的流添加到peerStream,每一个流会触发一次
    peer.ontrack = (e) => {
      peerStream.addTrack(e.track);
      peerVideo.current!.srcObject = peerStream;
      console.log("mount track");
    };
    // 监听ice候选对象
    peer.onicecandidate = (e) => {
      const candidate = e.candidate;
      if (candidate) {
        socket.emit("candidate", {
          candidate,
          myId: socket!.id,
          roomId: "Home",
        });
      }
    };

    // 创建offer,设置本地描述
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    // 发送offer到远端
    socket.emit("offer", {
      sdp: offer.sdp,
      myId: socket.id,
      roomId,
    });
    // 监听远端的offer
    socket.on("call", ({ sdp }) => {
      console.log("get remote");
      peer
        .setRemoteDescription({
          type: "offer",
          sdp,
        })
        .catch((err) => {
          console.log(err);
        });
      peer.createAnswer().then((answer) => {
        peer.setLocalDescription(answer);
        socket.emit("answer", {
          sdp: answer.sdp,
          myId: socket!.id,
          roomId: roomId,
        });
      });
    });
    let flag = 0;
    socket.on("answer", ({ sdp }) => {
      if (flag == 0) {
        flag = 1;
        peer.setRemoteDescription({ type: "answer", sdp });
      }
    });

    socket.on("candidate", ({ candidate }) => {
      if (candidate) peer.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return peerStream;
  };
  useEffect(() => {
    Stream && (myVideo.current!.srcObject = Stream);

    Stream && socket.current && pushStream(Stream, socket.current!);
    return () => {
      hangDown();
      socket.current?.off("call");
      socket.current?.off("answer");
      socket.current?.off("candidate");
      socket.current?.off("hang-down");
    };
  }, [Stream, socket]);

  return (
    <>
      <div className="relative ">
        <video
          className={clsx(
            " left-0 top-0 bg-black ",
            videoChanged && "z-10 absolute"
          )}
          autoPlay
          muted
          playsInline
          width={videoChanged ? "100" : "auto"}
          ref={myVideo}
        ></video>
        <video
          className={clsx(
            " left-0 top-0 bg-black",
            !videoChanged && "z-10 absolute"
          )}
          autoPlay
          playsInline
          width={videoChanged ? "auto" : "100"}
          ref={peerVideo}
        ></video>
        <BiTransfer
          onClick={() => setVideoChanged(!videoChanged)}
          className="absolute cursor-pointer left-0 top-5 h-5 w-5 z-10"
        />
      </div>
      <Button onClick={hangDown}>hangDown</Button>
      <Button
        onClick={() => {
          pushStream(Stream!, socket.current!);
        }}
      >
        link
      </Button>
    </>
  );
}
