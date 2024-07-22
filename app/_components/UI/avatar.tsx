import clsx from "clsx";
import Image from "next/image";

type props = {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function Avatar({
  className,
  src,
  width = 400,
  height = 400,
  alt,
}: props) {
  return (
    <div
      className={clsx(
        "inline-block rounded-[30%] overflow-hidden size-[2rem]",
        className
      )}
    >
      <Image src={src} alt={alt || "avatar"} width={width} height={height} />
    </div>
  );
}
