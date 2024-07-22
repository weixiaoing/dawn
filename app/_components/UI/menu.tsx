"use client";
import clsx from "clsx";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
type props = {
  children: React.ReactNode;
  className?: string;
};
export default function Menu({ children, className }: props) {
  const [open, setOpen] = useState(false);
  return (
    <main className={clsx("flex items-center relative sm:flex-col", className)}>
      <AiOutlineMenu
        onClick={() => setOpen((open) => !open)}
        className="sm:hidden"
      />
      {open && (
        <div className="relative">
          <div className="absolute left-0 top-0 ">{children}</div>
        </div>
      )}
      <div className=" space-x-2 items-center hidden sm:flex">{children}</div>
    </main>
  );
}
