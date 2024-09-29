import { useEffect, useState } from "react";

const useMediaStream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMediaStream(stream);
        console.log("获取音视频成功", stream);
      })
      .catch((error) => {
        console.log("获取音视频失败", error.message);
      });
  }, []);
  return mediaStream;
};
export default useMediaStream;
