import { useEffect, useState } from "react";

const useMediaStream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  function getMediaStream(maxAttempts = 999) {
    const constraints = {
      audio: true,
      video: true,
    };
    let attempt = 0;
    return () => {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.onended = () => {
              attempt++;
              console.log("MediaStreamTrack ended. Attempting to reacquire.");
              getMediaStream();
            };
          });
          // 媒体流获取成功的处理逻辑
          setMediaStream(stream);
          // 将 stream 绑定到视频元素等
        })
        .catch((err) => {
          console.error("Error acquiring media stream:", err);
          if (attempt < maxAttempts) {
            attempt++;
            console.log(`Retrying... Attempt ${attempt}/${maxAttempts}`);
            getMediaStream();
          } else {
            console.log(
              "Max attempts reached. Unable to acquire media stream."
            );
            // 达到最大尝试次数后的处理逻辑
          }
        });
    };
  }
  function stopMediaStream() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(undefined);
    }
  }

  useEffect(() => {
    getMediaStream()();
    return () => {
      console.log("stop");
      stopMediaStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { mediaStream, stopMediaStream };
};
export default useMediaStream;
