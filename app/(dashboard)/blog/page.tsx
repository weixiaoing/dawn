import Card from "@/_components/UI/card";
import { Skeleton } from "@/_components/UI/Skeleton";
import { getBlogList } from "@/utils";
import dayjs from "dayjs";
import { Metadata } from "next";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";

export const metadata: Metadata = {
  title: "Blog",
  description: "just do it!",
};
export default function Blog() {
  return (
    <div className=" pt-10">
      <BlogList />
    </div>
  );
}

async function BlogList() {
  let { data } = await getBlogList();
  data = data.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  return (
    <>
      <ul className="space-y-4">
        {data.map((item: any) => {
          return (
            <Card
              cover="123"
              hoverable
              className="p-0"
              key={item._id}
              header={
                <Link href={`/blog/${item._id}`}>
                  <h1 className="text-xl dark:text-zinc-200 hover:font-medium">
                    {item.title}
                  </h1>
                </Link>
              }
              describtion={item.summary}
              footer={
                <div>
                  <span className="text-gray-400 text-center flex gap-2 items-center ">
                    <MdDateRange />
                    {dayjs(item.date).format("YYYY-MM-DD")}
                  </span>
                </div>
              }
            ></Card>
          );
        })}
        {data.length === 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[full] h-5 "></Skeleton>
          ))}
      </ul>
    </>
  );
}
