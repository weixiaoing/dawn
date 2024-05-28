"use client";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import useSocket from "./hook";

export default function Video() {
  const { socket } = useSocket({});
  const peerStream = useRef<MediaStream>();
  const [errorSetting, setErrorSetting] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const mySteamRef = useRef<MediaStream>();

  const pushStream = async (
    stream: MediaStream,
    socket: Socket,
    peerStream: MediaStream,
    roomId = "Home"
  ) => {
    const peer = new RTCPeerConnection();

    stream.getTracks().forEach((track) => {
      console.log("track", track);

      peer.addTrack(track, stream);
    });
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("offer");
    console.log("id", socket.id);

    socket.emit("offer", {
      sdp: offer.sdp,
      myId: socket.id,
      roomId,
    });
    socket.on("call", async ({ sdp }) => {
      console.log("call", sdp);

      await peer.setRemoteDescription({
        type: "offer",
        sdp,
      });
      peer.createAnswer().then(async (answer) => {
        await peer.setLocalDescription(answer);
        socket!.emit("answer", {
          sdp: answer.sdp,
          myId: socket!.id,
          roomId: roomId,
        });
      });
    });
    socket.on("answer", ({ sdp }) => {
      console.log("this is answer");

      peer.setRemoteDescription({ type: "answer", sdp });
    });
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
    socket.on("candidate", ({ candidate }) => {
      peer.addIceCandidate(new RTCIceCandidate(candidate));
    });
    peer.ontrack = (e) => {
      peerStream.addTrack(e.track);
      peerVideo.current!.srcObject = peerStream;
    };
    return peer;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        mySteamRef.current = stream;
        myVideo.current!.srcObject = stream;
        if (socket) {
          pushStream(mySteamRef.current!, socket, new MediaStream());
        }
      })
      .catch((error) => {
        setErrorSetting(error.message);
      });
  }, [socket]);

  return (
    <div className="grid grid-cols-[3fr,1fr]">
      <div>
        <h1>user</h1>
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
