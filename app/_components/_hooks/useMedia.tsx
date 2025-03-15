import { useEffect, useState } from "react";

const useMediaStream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // 视频状态
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  function getMediaStream() {
    const constraints = {
      audio: true,
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // 媒体流获取成功的处理逻辑
        setMediaStream(stream);
        // 将 stream 绑定到视频元素等
      })
      .catch((err) => {
        console.error("Error acquiring media stream:", err);
      });
  }
  function stopMediaStream() {
    if (mediaStream) {
      console.log("stop mediaStream");
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(undefined);
    }
  }

  const toggleVideo = async () => {
    mediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = !isVideoEnabled;
    });
    setIsVideoEnabled((v) => !v);
  };

  const toggleAudio = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        video: !isVideoEnabled,
        audio: true,
      })
      .then((stream) => {
        // 媒体流获取成功的处理逻辑
        setMediaStream(stream);
        // 将 stream 绑定到视频元素等
      });
    setIsAudioEnabled((v) => !v);
  };

  useEffect(() => {
    getMediaStream();
    return () => {
      console.log("stop Media");
      stopMediaStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    mediaStream,
    stopMediaStream,
    toggleVideo,
    toggleAudio,
    isVideoEnabled,
    isAudioEnabled,
  };
};
export default useMediaStream;
