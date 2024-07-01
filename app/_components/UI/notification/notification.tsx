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
  success: <AiOutlineCheckCircle  />,
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
    style={{ transition: "all 0.3s ease-in-out" }}
      className={clsx(
        ` p-2 m-auto bg-white  flex items-center rounded-md shadow-sm font-serif border`
      )}
    >
      <div className={clsx("mr-3",{"text-green-500":type==="success","text-blue-500":type==="info","text-yellow-500":type==="warning","text-red-500":type==="error"})}>{icons[type]}</div>
      <span className="max-w-40  text-ellipsis overflow-hidden   ">{message}</span>
      {/* {
        <AiOutlineCloseCircle
          className="ml-2 flex items-center"
          onClick={onClose}
        />
      } */}
    </div>
  );
};
export default Notification;
