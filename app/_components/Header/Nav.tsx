import Image from "next/image";
import Link from "next/link";
import { HoverTag } from "../HoverTag";

export function Nav() {
  return (
    <nav className="p-[32px] max-w-[1024px] mx-auto">
      <ul className="flex space-x-5 ">
        <div className="size-10 relative top-[-10px] cursor-auto ">
          <Link href={"/"}>
            <img
              src="https://avatars.githubusercontent.com/u/93917549?v=4"
              alt="Dawn"
              title="主页"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex-1"></div>
        <li>
          <Link href={"/blog"}>
            <HoverTag>Blog</HoverTag>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <HoverTag>Project</HoverTag>
          </Link>
        </li>
        <li>
          <a
            href={"https://github.com/weixiaoing"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverTag>
              <Image
                src="/Header/RiGithubLine.svg"
                width={24}
                height={24}
                alt="Dawn"
                title="Dawn"
              ></Image>
            </HoverTag>
          </a>
        </li>
      </ul>
    </nav>
  );
}
