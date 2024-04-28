"use client";

import Image from "next/image";

export function ScrollTop() {
  return (
    <div
      onClick={() => {
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="rounded-full fixed bottom-5 right-2  hover:bg-slate-500 p-1 cursor-pointer"
    >
      <Image
        src="/Header/CarbonArrowUp.svg"
        width={16}
        height={16}
        alt="Top"
      ></Image>
    </div>
  );
}
