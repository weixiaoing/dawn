/* eslint-disable @next/next/no-img-element */

import clsx from "clsx";
type props = {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  describtion?: React.ReactNode;
  border?: boolean;
  coverClick?: () => void;
  hoverable?: boolean;
  cover?: React.ReactNode;
};
export default function Card({
  children,
  className,
  header,
  footer,
  describtion,
  border,
  cover,

  hoverable = false,
}: props) {
  return (
    <div
      className={clsx(
        " rounded-lg !important overflow-hidden bg-white dark:bg-[rgb(66,66,66)] ",
        border && "border border-zinc-200  dark:border-opacity-20 ",
        hoverable && "hover:shadow-md",
        className
      )}
    >
      {cover && <>{cover}</>}
      <div className="p-4 overflow-hidden break-words break-all space-y-4">
        {header && <header>{header}</header>}
        {describtion && <div className="text-gray-400 ">{describtion}</div>}
        {children}
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
