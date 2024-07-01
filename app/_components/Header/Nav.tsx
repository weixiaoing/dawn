import Image from "next/image";
import Link from "next/link";
import GitHub from "../../../public/Header/RiGithubLine.svg";
import { HoverTag } from "../HoverTag";
import ThemeSwitcher from "./ThemeSwitcher";
export function Nav() {
  return (
    <nav className="p-[32px] max-w-[1024px] mx-auto">
      <ul className="flex space-x-5 ">
        <div className="size-10 relative top-[-10px] cursor-auto ">
          <Link href={"/"}>
            <Image
              width={40}
              height={40}
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
          <Link href={"/project"}>
            <HoverTag>Project</HoverTag>
          </Link>
        </li>
        <li>
          <Link href={"/Intest"}>
            <HoverTag>实验室</HoverTag>
          </Link>
        </li>
        <li>
          <Link href={"/video"}>
            <HoverTag>Video</HoverTag>
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
        <li>
          <a
            href={"https://github.com/weixiaoing"}
            target="_blank"
            rel="noopener noreferrer"
            title="Dawn's GitHub"
          >
            <HoverTag>
              <GitHub width={24} height={24} alt="Dawn" title="Dawn"></GitHub>
            </HoverTag>
          </a>
        </li>
      </ul>
    </nav>
  );
}
