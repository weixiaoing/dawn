import { getBlogList } from "@/app/utils";
import Link from "next/link";
import { HoverTag } from "../HoverTag";
import { Skeleton } from "../UI/Skeleton";

export default async function BlogList() {
  const arr: any[] | any = await getBlogList();
  return (
    <>
      <ul className="space-y-2">
        {arr.map((item: any) => {
          return (
            <li key={item.id}>
              <Link href={`/blog/${item.id}`}>
                <span className="text-xl  overflow-hidden text-ellipsis whitespace-nowrap  text-gray-500 hover:text-gray-700 hover:font-medium">
                  <HoverTag>{item.title}</HoverTag>
                </span>
              </Link>
            </li>
          );
        })}
        {arr.length === 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[full] h-5 "></Skeleton>
          ))}
      </ul>
    </>
  );
}
