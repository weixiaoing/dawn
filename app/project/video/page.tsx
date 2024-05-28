"use client";

import { useRef } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  //   const [stream, setStream] = useState<MediaStream>();
  async function playVideoFromCamera() {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream);

      videoRef.current!.srcObject = stream;
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }
  playVideoFromCamera();

  return (
    <div>
      <h1>vide</h1>
      <video autoPlay playsInline controls={false} ref={videoRef}></video>
    </div>
  );
};
export default Video;
