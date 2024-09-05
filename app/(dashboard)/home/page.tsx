import Image from "next/image";
import BlogList from "../../_components/BlogList";
import "./page.module.css";
import FadeText from "@/_components/FadeText";

const description = "这里是一只正在学习前端,渴望学会全栈,梦想做开源的未晓";

export default function Home() {
  return (
    <>
      <main className="pt-40 space-y-5 ">
        <div className="  mx-auto ">
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
    </>
  );
}
