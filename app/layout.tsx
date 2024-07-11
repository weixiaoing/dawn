import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Header } from "./_components/Header";
import "./globals.css";
import clsx from "clsx";

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
          "dark:bg-gray-900 bg-orange-50 bg-opacity-30"
        )}
      >
        <div className="min-h-screen dark:text-white ">
          <Header></Header>
          <main className="animate-fade-in max-w-2xl p-[20px] mx-auto">
            {" "}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
