// import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./utils/Providers/ReactQueryProvider";

const roboto_mono = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dawnot Blog",
  description: "just do it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Dawn Blog</title>
      </head>
      <body
        className={clsx(
          roboto_mono.className,
          "dark:bg-[rgb(48,48,48)] bg-[rgb(254,252,253)]"
        )}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
