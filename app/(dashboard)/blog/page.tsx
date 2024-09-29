/* eslint-disable @next/next/no-img-element */
"use client";
import Card from "@/_components/UI/card";
import { VirtualList } from "@/_components/UI/VirtualList";
import { BlogData } from "@/_typs/blog";
import { getBlogList } from "@/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
export default function Blog() {
  return (
    <div className=" pt-10">
      <BlogList />
    </div>
  );
}

function BlogList() {
  const [data, setData] = useState<BlogData[]>([]);

  useEffect(() => {
    getBlogList().then((res) => {
      let result = res.data;
      setData(result);
    });
  }, []);
  return (
    <>
      <VirtualList
        containerHeight={900}
        bufferCount={5}
        list={data}
        renderItem={(item) => (
          <div className="pb-4">
            <Card
              // cover={
              //   <Link href={`/blog/${item._id}`}>
              //     <div>
              //       <img
              //         className="w-full min-h-[100px] max-h-[200px] dim-image  "
              //         src={item.cover}
              //         loading="lazy"
              //         srcSet="https://www.notion.so/images/page-cover/solid_beige.png"
              //         alt="cover"
              //       />
              //     </div>
              //   </Link>
              // }
              hoverable
              className="p-0"
              key={item._id}
              header={
                <div className="space-y-2">
                  <Link href={`/blog/${item._id}`}>
                    <h1 className="text-xl dark:text-zinc-200 hover:font-medium">
                      {item.title}
                    </h1>
                  </Link>
                  <div className="flex gap-2">
                    {item.tags.map((tag: string) => (
                      <div
                        className="bg-[rgb(209,230,181)] p-1 rounded-md text-sm text-[#000000cc]"
                        key={tag}
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              }
              describtion={item.summary}
              footer={
                <div>
                  <span className="text-gray-400 text-center text-sm flex gap-2 items-center ">
                    <MdDateRange />
                    {dayjs(item.date).locale("zh").format("YYYY年M月DD日")}
                    <AiFillEye />
                    {<>{item.watched}</>}
                    <AiFillLike />
                    {<>{item.like}</>}
                  </span>
                </div>
              }
            ></Card>
          </div>
        )}
      />
    </>
  );
}
