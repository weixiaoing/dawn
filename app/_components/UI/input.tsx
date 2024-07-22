import clsx from "clsx";
type props = {
  border?: boolean;
  className?: string;
  type: "text" | "textarea" | "password";
  value?: string;
  onChange?: () => {};
  placeholder?: string;
  children?: React.ReactNode;
  [key: string]: any;
};
export default function Input({
  border = true,
  className,
  value,
  type,
  onChange,
  placeholder,
  children,
  ...props
}: props) {
  switch (type) {
    case "text":
      return (
        <input
          className={clsx(
            "outline-none p-2",
            border && "border border-zinc-200  dark:border-opacity-20"
          )}
          type="text"
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
            onChange={onChange}
            placeholder={placeholder}
            {...props}
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
        />
      );
      break;
  }
}
