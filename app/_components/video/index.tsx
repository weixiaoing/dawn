"use client";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

import useMediaStream from "@/_components/_hooks/useMedia";
import useSocket from "@/_components/_hooks/useSocket";
import clsx from "clsx";
import Button from "../UI/button";

export class MultiPartyConference {
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private localStream: MediaStream | null = null;
  private remoteStreams: Map<string, MediaStream> = new Map();
  constructor(
    private config: RTCConfiguration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    },
    private onRemoteStream?: (userId: string, stream: MediaStream) => void,
    private onPeerDisconnected?: (userId: string) => void
  ) {}
  async initLocalStream(
    constraints: MediaStreamConstraints = { video: true, audio: true }
  ) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.localStream;
    } catch (error) {
      console.error("获取本地媒体流失败", error);
      throw error;
    }
  }

  async createPeerConnection(userId: string) {
    const peerConnection = new RTCPeerConnection(this.config);
  }
}

export default function VideoBase() {
  const cache = useRef(false);
  const socket = useSocket();
  const [errorSetting, setErrorSetting] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const { mediaStream: Stream, stopMediaStream } = useMediaStream();
  const [linked, setLinked] = useState(false);
  const [videoChanged, setVideoChanged] = useState(false);
  const hangDown = () => {
    if (socket.current) {
      socket.current.emit("hang-down-server", { roomId: "Home" });
      peerVideo.current!.srcObject = null;
    }
  };
  const pushStream = async (
    stream: MediaStream,
    socket: Socket,
    roomId = "Home"
  ) => {
    console.log("pushStream");

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
      if (peerVideo.current?.srcObject) peerVideo.current.srcObject = null;
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
          console.log("get remote error");

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
        try {
          peer.setRemoteDescription({ type: "answer", sdp });
        } catch (error) {
          console.log("error");
        }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const tmpSocket = socket.current;
      if (tmpSocket) {
        tmpSocket.off("call");
        tmpSocket.off("answer");
        tmpSocket.off("candidate");
        tmpSocket.off("hang-down");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Stream, socket]);
  const [members, setMembers] = useState<string[]>([]);
  return (
    <>
      <div className="overflow-hidden">
        <main className="flex w-full">
          {" "}
          <video
            className={clsx(" bg-black relative")}
            autoPlay
            muted
            playsInline
            width={200}
            style={{ height: "300px" }}
            ref={myVideo}
          >
            <span className="absolute left-0 top-0 text-red-500 z-30">my</span>
          </video>
          <video
            className={clsx(" bg-black")}
            autoPlay
            playsInline
            width={200}
            style={{ height: "300px" }}
            ref={peerVideo}
          ></video>
        </main>
        {/* <BiTransfer
          onClick={() => setVideoChanged(!videoChanged)}
          className="absolute cursor-pointer left-0 top-5 h-5 w-5 z-10"
        /> */}
      </div>
      <div>
        <Button onClick={hangDown}>hangDown</Button>
        <Button
          onClick={() => {
            pushStream(Stream!, socket.current!);
          }}
        >
          link
        </Button>
      </div>
    </>
  );
}
