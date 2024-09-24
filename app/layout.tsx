import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Header } from "./_components/Header";
import "./globals.css";

const roboto_mono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

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
      <body
        className={clsx(
          roboto_mono.className,
          "dark:bg-[rgb(48,48,48)] bg-[rgb(241,242,243)] "
        )}
      >
        <div className="min-h-screen  bg-transparent flex-col font-normal dark:text-white ">
          <Header />
          <main className="z-[-10] animate-fade-in max-w-screen-md p-4 mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
