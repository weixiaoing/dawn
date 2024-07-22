"use client";
import { AiOutlineArrowUp } from "react-icons/ai";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import Button from "../UI/button";

export function ScrollTop() {
  return (
    <div className=" flex flex-col space-y-2 items-center fixed bottom-5 right-2  ">
      <ThemeSwitcher></ThemeSwitcher>
      <Button>
        <AiOutlineArrowUp
          onClick={() => {
            scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </Button>
    </div>
  );
}
