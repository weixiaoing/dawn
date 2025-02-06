"use client";

import Button from "@/_components/UI/button";
import VideoBase from "@/_components/video";
import { useState } from "react";

const Video = function () {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex self-center w-full justify-center">
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          animation
          className="mt-40"
          border
        >
          进入视频通话
        </Button>
      )}
      {open && (
        <div className="w-full">
          <main className="h-[50vh] w-full bg-slate-400">
            <VideoBase />
          </main>
          <footer>
            <Button
              onClick={() => setOpen(false)}
              animation
              className="mt-5"
              border
            >
              退出视频通话
            </Button>
          </footer>
        </div>
      )}
    </div>
  );
};
export default Video;
