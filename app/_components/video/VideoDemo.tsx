import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import useMediaStream from "../_hooks/useMedia";

import Button from "../UI/button";
import useSocket from "../_hooks/useSocket";

const VideoDemo = () => {
  const socket = useSocket();
  const remoteConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const { mediaStream: localStream, toggleVideo } = useMediaStream();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [key: string]: MediaStream;
  }>({});

  const room = "VideoTest";
  // 超过5人 延迟显著变高
  const maxSize=5
  // 进入通话房间
  useEffect(() => {
    if (!socket?.id) return;
    console.log("i join");
    socket.emit("join", { target: room });
    return () => {
      console.log("i leave", socket);
    };
  }, [socket, socket?.id]);
  // 赋值本地流
  useEffect(() => {
    if (localStream) {
      localVideoRef.current!.srcObject = localStream;
    }
  }, [localStream]);
  useEffect(() => {
    socket?.open();
    return () => {
      socket?.emit("left", { target: room });
      socket?.close();
    };
  }, [socket]);
  const startCall = async () => {
    if (!localStream || !socket) return;
    console.log("startCall");
    socket.emit("join", { target: room });
  };

  useEffect(() => {
    if (!socket || !localStream) return; // 确保 socket 已连接
    const handleJoined = async ({ sender }: { sender: string }) => {
      const pc = new RTCPeerConnection();
      console.log("handleJoined");
      remoteConnections.current.set(sender, pc);
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
      pc.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setRemoteStreams((prev) => ({ ...prev, [sender]: remoteStream }));
      };
      pc.onicecandidate = (event) => {
        console.log("joined icecandidate");

        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            target: sender,
          });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { sdp: offer, target: sender });
    };

    const handleOffer = async (data: {
      sdp: RTCSessionDescription;
      sender: string;
    }) => {
      console.log("handleOffer", data);
      const pc = new RTCPeerConnection({
        // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      remoteConnections.current.set(data.sender, pc);
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            target: data.sender,
          });
        }
      };

      pc.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setRemoteStreams((prev) => ({ ...prev, [data.sender]: remoteStream }));
      };
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      console.log(
        "offer to answer",
        remoteConnections.current.get(data.sender)
      );

      socket.emit("answer", { sdp: answer, target: data.sender });
    };
    const handleAnswer = (data: {
      sdp: RTCSessionDescription;
      sender: string;
    }) => {
      console.log("handleAnswer");
      const pc = remoteConnections.current.get(data.sender);
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      }
    };

    const handleIceCandidate = (data: {
      candidate: RTCIceCandidate;
      sender: string;
    }) => {
      const pc = remoteConnections.current.get(data.sender);

      console.log(pc, data);

      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    const handleLeft = (data: { sender: string }) => {
      console.log(data.sender, "left the room");
      const pc = remoteConnections.current.get(data.sender);
      if (pc) {
        pc.close();
      }
      remoteConnections.current.delete(data.sender);
      setRemoteStreams((prev) => {
        const { [data.sender]: _, ...rest } = prev;
        return rest;
      });
    };

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("joined", handleJoined);
    socket.on("left", handleLeft);

    return () => {
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("joined", handleJoined);
      socket.off("left", handleLeft);
    };
  }, [socket, localStream]);

  return (
    <div className="flex">
      <main className="flex-1">
        {" "}
        <video
          className={clsx(" bg-black relative")}
          autoPlay
          muted
          playsInline
          ref={localVideoRef}
        >
          <span className="absolute left-0 top-0 text-red-500 z-30">my</span>
        </video>
        <Button border onClick={startCall}>
          开始通话
        </Button>
        <Button
          border
          onClick={() => {
            toggleVideo();
            console.log(socket);
          }}
        >
          toggle video
        </Button>
        <Button
          border
          onClick={() => {
            console.log(remoteConnections.current);
            console.log(remoteStreams);
          }}
        >
          pc
        </Button>
      </main>
      <section className="w-[200px] overflow-scroll">
        {Object.keys(remoteStreams).map((id) => (
          <VideoPlayer key={id} stream={remoteStreams[id]} />
        ))}
      </section>
    </div>
  );
};

const VideoPlayer = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      autoPlay
      className="bg-black"
      playsInline
      width={200}
      ref={videoRef}
    />
  );
};

export default VideoDemo;
