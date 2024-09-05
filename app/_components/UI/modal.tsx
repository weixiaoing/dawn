// "use client";
import React from "react";
import { createPortal } from "react-dom";

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
export default function Modal({ children, open, onCancel, display }: props) {
  return (
    <>
      {display}
      {open && (
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
