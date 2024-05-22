"use client";

import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import Notification, { NotificationType } from "./notification";

const useNotification = (
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right" = "top-right"
) => {
  const timer = useRef<NodeJS.Timeout>();
  const [notification, setNotification] = useState<NotificationType | null>();
  const triggerNotification = useCallback((props: NotificationType) => {
    clearTimeout(timer.current);
    setNotification(props);
    timer.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return null;
  }, []);
  const NotificationComponent = notification ? (
    <div
      className={clsx("fixed", {
        "top-5 right-5": position === "top-right",
        "top-5 left-5": position === "top-left",
        "bottom-5 right-5": position === "bottom-right",
        "bottom-5 left-5": position === "bottom-left",
      })}
    >
      <Notification {...notification} />
    </div>
  ) : null;
  return { triggerNotification, NotificationComponent };
};

export default useNotification;
