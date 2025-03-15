"use client";
import Button from "@/_components/UI/button";
import Card from "@/_components/UI/card";
import VideoBase from "@/_components/video";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Video = function () {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  if (!session?.user) {
    return (
      <div className="flex self-center w-full justify-center">
        <Card className="w-[400px]" border header="请先登录">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => signIn("github")}
              className="border rounded-full"
            >
              <FaGithub size={60} />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main className="h-[50vh] w-full ">
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
  );
};
export default Video;
