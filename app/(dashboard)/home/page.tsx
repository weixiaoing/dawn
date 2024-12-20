import FadeText from "@/_components/FadeText";
import Image from "next/image";
// import "./page.module.css";

const description = "这里是一只正在学习前端,渴望学会全栈,梦想做开源的未晓";

export default function Home() {
  return (
    <>
      <div className="min-h-full flex justify-center ">
        <main className=" space-y-5 ">
          <div className="mx-auto ">
            <Image
              width={100}
              height={100}
              src="https://avatars.githubusercontent.com/u/93917549?v=4"
              alt="Dawn"
              title="Dawn"
              className="rounded-full mx-auto"
            />
          </div>
          <h1 className="text-3xl flex font-black ">
            你好
            <div className="animate-shake-hand origin-bottom-right">👋</div>
          </h1>

          <FadeText text={description} />
        </main>
      </div>
    </>
  );
}
