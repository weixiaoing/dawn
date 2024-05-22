"use client";

import useNotification from "../_components/UI/notification/hooks";

export default function Project() {
  const { triggerNotification, NotificationComponent } =
    useNotification("bottom-left");
  return (
    <div>
      {NotificationComponent}
      <h1>Project</h1>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "err",
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
            message: "success",
            onClose: () => {},
          })
        }
      >
        success
      </button>
    </div>
  );
}
