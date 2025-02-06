import { Header } from "@/_components/Header";
import { ClientOnly } from "../_components/common/ClientOnly";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <div className="min-h-screen w-full  bg-transparent flex-col font-normal dark:text-white ">
        <Header />
        <main className=" w-[100%] flex-col items-center p-4 mx-auto">
          {children}
        </main>
      </div>
    </ClientOnly>
  );
}
