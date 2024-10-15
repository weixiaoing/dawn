/* eslint-disable @next/next/no-img-element */
"use client";
import Card from "@/_components/UI/card";
import { BlogData } from "@/_typs/blog";
import { getBlogList } from "@/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
export default function Blog() {
  return (
    <div className=" pt-10">
      <BlogList />
    </div>
  );
}
const limit = 10;
const threshold = 10;
function BlogList() {
  const [data, setData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (
      hasMore === true &&
      documentHeight - scrollTop - windowHeight < threshold
    ) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return;
  }, [hasMore]);

  useEffect(() => {
    if (loading && hasMore) {
      getBlogList({ skip: data.length, limit: 10 }).then((res) => {
        let result = res.data;

        if (result.length == 0) {
          console.log("到底了");
          setHasMore(false);
        }
        setData(data.concat(result));
        setLoading(false);
      });
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getBlogList({ skip: data.length, limit: 10 }).then((res) => {
      console.log("test");
      let result = res.data;
      setData(result);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* <VirtualList
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
      /> */}
      {data.map((item, index) => {
        return (
          <div key={index} className="pb-4">
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
        );
      })}
      {(loading || !hasMore) && (
        <div className="h-[100px] flex justify-center">
          {loading && (
            <svg
              className="animate-spin mr-2 h-10 w-10 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                opacity={0.75}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {!hasMore && <h1>到底啦</h1>}
        </div>
      )}
    </div>
  );
}
