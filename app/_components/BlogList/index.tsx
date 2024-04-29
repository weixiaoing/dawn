import Link from "next/link";

export default function BlogList({ arr }: { arr: string[] }) {
  return (
    <ul className="space-y-2">
      {arr.map((item, index) => {
        return (
          <li key={index}>
            <Link href={`/blog/${index}`}>
              {" "}
              <span className="text-xl  overflow-hidden text-ellipsis whitespace-nowrap  text-gray-500 hover:text-gray-700 hover:font-medium">
                {item}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
