import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./_components/Header";
import "./globals.css";
import { Providers } from "./provier";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen ">
            <Header></Header>
            <main className="max-w-2xl p-[20px] mx-auto "> {children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
