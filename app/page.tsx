import Link from "next/link";
import BlogList from "./_components/BlogList";

const description = "这里是一只正在学习前端,渴望学会全栈,梦想做开源的未晓";
export default function Home() {
  const arr = Array.from({ length: 10 }).map((_, i) => "这是博客标题" + i);
  return (
    <>
      <main className="pt-40 space-y-5">
        <div className="size-24 animate-bounce mx-auto ">
          <img
            src="https://avatars.githubusercontent.com/u/93917549?v=4"
            alt="Dawn"
            title="Dawn"
            className="rounded-full"
          />
        </div>
        <h1 className=" invert text-3xl flex font-black">
          你好!<div className="animate-shake-hand origin-bottom-right">👋</div>
        </h1>
        <p className="invert">{description}</p>
        <BlogList arr={arr} />
        <Link href={"/blog"} className="text-gray-400 hover:text-gray-700">
          more...
        </Link>
      </main>
    </>
  );
}
