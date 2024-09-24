"use client";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

import useMediaStream from "@/_hooks/useMedia";
import useSocket from "@/_hooks/useSocket";

export default function Video() {
  const cache = useRef(false);
  const socket = useSocket();
  const [errorSetting, setErrorSetting] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const Stream = useMediaStream();

  useEffect(() => {
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
        ],
      };  
      const peer = new RTCPeerConnection(configuration);
      // const peer = new RTCPeerConnection();
      const peerStream = new MediaStream();
      // 添加各种本地流到peer连接上
      stream.getTracks().forEach((track) => {
        console.log("track", track);
        peer.addTrack(track, stream);
      });
      // 监听接收事件,将接收到的流添加到peerStream,每一个流会触发一次
      peer.ontrack = (e) => {
        peerStream.addTrack(e.track);
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
        console.log("test");

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
      socket.on("answer", ({ sdp }) => {
        peer.setRemoteDescription({ type: "answer", sdp });
      });

      socket.on("candidate", ({ candidate }) => {
        peer.addIceCandidate(new RTCIceCandidate(candidate));
      });

      return peerStream;
    };
    Stream && (myVideo.current!.srcObject = Stream);
    const mountPeer = async () => {
      peerVideo.current!.srcObject = await pushStream(Stream!, socket.current!);
    };

    Stream && socket.current && mountPeer();
    return () => {
      socket.current?.off("call");
      socket.current?.off("answer");
      socket.current?.off("candidate");
    };
  }, [Stream, socket]);

  return (
    <div className="grid grid-cols-[3fr,1fr]">
      <div>
        <h1
          onClick={() => {
            console.log(Stream);
            console.log(myVideo.current?.srcObject == Stream);
          }}
        >
          user
        </h1>
        <video autoPlay muted playsInline width={"500px"} ref={myVideo}></video>
      </div>
      <div>
        <h1>peer</h1>
        <video
          className="border"
          autoPlay
          playsInline
          width={"500px"}
          ref={peerVideo}
        ></video>
      </div>
      <h1>{errorSetting}</h1>
    </div>
  );
}
