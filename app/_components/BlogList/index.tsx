import { BlogData } from "@/app/_typs/blog";
import Link from "next/link";

export default function BlogList({ arr }: { arr: BlogData[] }) {
  return (
    <ul className="space-y-2">
      {arr.map((item) => {
        return (
          <li key={item.id}>
            <Link href={`/blog/${item.id}`}>
              {" "}
              <span className="text-xl  overflow-hidden text-ellipsis whitespace-nowrap  text-gray-500 hover:text-gray-700 hover:font-medium">
                {item.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
