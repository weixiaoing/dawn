"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Moon from "../../../public/Header/moon.svg";
import Sun from "../../../public/Header/sun.svg";
import { HoverTag } from "../HoverTag";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toggleDarkMode = async (isDarkMode: boolean) => {
    if (ref.current === null) return;
    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(isDarkMode);
      });
    }).ready;
    const { top, left } = ref.current.getBoundingClientRect();

    const x = left;
    const y = top;
    const right = window.innerWidth - y;
    const bottom = window.innerHeight - x;

    const maxRadius = Math.hypot(Math.max(y, right), Math.max(x, bottom));
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div
      onClick={() => {
        toggleDarkMode(!isDarkMode);
        return false;
      }}
      ref={ref}
    >
      {" "}
      <HoverTag>{isDarkMode ? <Moon /> : <Sun />}</HoverTag>
    </div>
  );
}
