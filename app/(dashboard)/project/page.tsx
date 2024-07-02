"use client";

import useNotification from "@/_components/UI/notification/hooks";
import FileUploader from "@/_components/Upload";
import Video from "@/_components/video";

export default function Project() {
  const { triggerNotification, NotificationComponent } = useNotification("top");
  return (
    <div>
      {NotificationComponent}
      <h1 className="text-3xl text-center">Project</h1>
      <button
        className="p-1 border rounded box-border m-2"
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "错误~~",
            onClose: () => {},
          })
        }
      >
        err
      </button>
      <button
        className="border"
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "成功啦~",
          })
        }
      >
        success
      </button>
      <FileUploader />
    </div>
  );
}
