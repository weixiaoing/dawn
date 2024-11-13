// "use client";
import React, { useState } from "react";

type props = {
  display?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  open?: boolean;
  border?: boolean;
};
export default function Modal({ children, onCancel, display }: props) {
  const [show, setShow] = useState(false);
  return (
    <>
      {display && (
        <div
          onClick={(e) => {
            setShow((v) => !v);
          }}
        >
          {display}
        </div>
      )}
      {show && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onCancel?.();
            }
          }}
          className="fixed left-0 top-0 bg-slate-500 bg-opacity-35 w-screen h-screen"
        >
          {children}
        </div>
      )}
    </>
  );
}
