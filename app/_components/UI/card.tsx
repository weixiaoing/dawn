/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
type props = {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  describtion?: React.ReactNode;
  border?: boolean;
  hoverable?: boolean;
  cover?: string;
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
      {cover && (
        <div>
          <img
            className="w-full min-h-[100px] max-h-[200px] dim-image  "
            src={cover}
            loading="lazy"
            srcSet="https://www.notion.so/images/page-cover/solid_beige.png"
            alt="cover"
          />
        </div>
      )}
      <div className="p-4 break-words break-all space-y-4">
        {header && <header>{header}</header>}
        {describtion && <div className="text-gray-400 ">{describtion}</div>}
        {children}
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
