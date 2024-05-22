"use client";
import clsx from "clsx";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

const icons = {
  success: <AiOutlineCheckCircle />,
  info: <AiOutlineInfoCircle />,
  warning: <AiOutlineWarning />,
  error: <AiOutlineExclamationCircle />,
};
export interface NotificationType {
  type?: "info" | "success" | "warning" | "error";
  message: string;
  onClose: () => void;
}
const Notification = ({
  type = "info",
  message,
  onClose,
}: NotificationType) => {
  return (
    <div
      className={clsx(
        `p-4 m-2.5 text-white flex items-center rounded-md shadow-sm font-serif`,
        {
          "bg-green-500": type === "success",
          "bg-blue-500": type === "info",
          "bg-yellow-500": type === "warning",
          "bg-red-500": type === "error",
        }
      )}
    >
      <div className="mr-3">{icons[type]}</div>
      {message}
      {
        <AiOutlineCloseCircle
          className="ml-2 flex items-center"
          onClick={onClose}
        />
      }
    </div>
  );
};
export default Notification;
