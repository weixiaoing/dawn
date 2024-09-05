import clsx from "clsx";
import { FC } from "react";
type props = {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  describtion?: React.ReactNode;
  border?: boolean;
};
export default function Card({
  children,
  className,
  header,
  footer,
  describtion,
  border,
}: props) {
  return (
    <div
      className={clsx(
        "p-4 break-words break-all space-y-4  rounded-[16px] gap-4",
        border && "border border-zinc-200  dark:border-opacity-20",
        className
      )}
    >
      {header && <header className="text-4xl ">{header}</header>}
      {describtion && (
        <div className="text-gray-400 text-[12px]">{describtion}</div>
      )}
      {children}
      {footer && <footer>{footer}</footer>}
    </div>
  );
}
