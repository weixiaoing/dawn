import clsx from "clsx";
import { ReactEventHandler, useState } from "react";
import Card from "./card";

type props = {
  children: React.ReactNode;
  className?: string;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  border?: boolean;
};

export default function Button({
  children,
  className,
  onClick,
  type,
  disabled,
  loading,
  border,
}: props) {
  return (
    <button
      className={clsx(
        "p-1 inline-flex rounded outline-none items-center justify-center active:font-bold hover:font-medium ",
        border && "border border-blue-400 text-blue-400",
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin mr-2 h-5 w-5 text-blue-100"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            opacity={0.75}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {children}
    </button>
  );
}
