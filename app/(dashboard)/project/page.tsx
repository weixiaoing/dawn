"use client";

import Button from "@/_components/UI/button";
import Card from "@/_components/UI/card";
import useNotification from "@/_components/UI/notification/hooks";
import FileUploader from "@/_components/Upload";
import Video from "@/_components/video";

export default function Project() {
  const { triggerNotification, NotificationComponent } = useNotification("top");
  return (
    <div>
      {NotificationComponent}
      <h1 className="text-3xl text-center">Project</h1>
      <Button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "错误~~",
            onClose: () => {},
          })
        }
      >
        err
      </Button>
      <Button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "成功啦~",
          })
        }
      >
        success
      </Button>
      <FileUploader />
      <Card
        header={<h1>top</h1>}
        footer={<h1>bottom</h1>}
        describtion={<h1>describtion</h1>}
      >
        <div>hello</div>
      </Card>
    </div>
  );
}
