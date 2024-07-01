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
      <body className={roboto_mono.className}>
        <div className="min-h-screen dark:text-white ">
          <Header></Header>
          <main className="max-w-2xl p-[20px] mx-auto"> {children}</main>
        </div>
      </body>
    </html>
  );
}
