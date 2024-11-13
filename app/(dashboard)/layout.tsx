import { Header } from "@/_components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full  bg-transparent flex-col font-normal dark:text-white ">
      <Header />
      <main className="z-[-20] w-[100%] flex-col items-center p-4 mx-auto">
        {children}
      </main>
    </div>
  );
}
