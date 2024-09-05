/* eslint-disable react/display-name */
import clsx from "clsx";
import { HtmlChangedEvent } from "md-editor-rt";
import { ChangeEvent, forwardRef } from "react";
type props = {
  border?: boolean;
  className?: string;
  type: "text" | "textarea" | "password";
  value?: string;
  placeholder?: string;
  children?: React.ReactNode;
  [key: string]: any;
};
const Input = forwardRef(
  (
    {
      border = true,
      className,
      value,
      type,
      placeholder,
      children,
      ...props
    }: props,
    ref: React.Ref<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    switch (type) {
      case "text":
        return (
          <input
            className={clsx(
              "outline-none p-2",
              border && "border border-zinc-200  dark:border-opacity-20"
            )}
            type="text"
            {...props}
            ref={ref}
          />
        );

      case "textarea":
        return (
          <div>
            <textarea
              className={clsx(
                "outline-none w-[100%] resize-none scrolll",
                border && "focus:border-blue-300 focus:border",
                className
              )}
              value={value}
              placeholder={placeholder}
              {...props}
              ref={ref}
            ></textarea>
            {children}
          </div>
        );
      default:
        return (
          <input
            className={clsx(
              "outline-none bg-transparent bg-slate-50 p-1",
              border && "border border-zinc-200  dark:border-opacity-20"
            )}
            type="text"
            {...props}
          />
        );
        break;
    }
  }
);

export default Input;
