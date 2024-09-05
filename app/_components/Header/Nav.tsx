import Image from "next/image";
import Link from "next/link";
import GitHub from "../../../public/Header/RiGithubLine.svg";
import { HoverTag } from "../HoverTag";
import ThemeSwitcher from "./ThemeSwitcher";
import Avatar from "../UI/avatar";
import Menu from "../UI/menu";
export function Nav() {
  return (
    <nav className="p-4 flex justify-between max-w-[1024px] mx-auto ">
      <Link className="order-2 sm:order-1" href={"/"}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/93917549?v=4"
          alt="Dawn"
        />
      </Link>

      <Menu className="order-1 sm:order-[2]">
        <Link href={"/blog"}>
          <HoverTag>Blog</HoverTag>
        </Link>

        <Link href={"/project"}>
          <HoverTag>Project</HoverTag>
        </Link>
        <Link href={"/video"}>
          <HoverTag>video</HoverTag>
        </Link>
      </Menu>

      <a
        className="order-3 "
        href={"https://github.com/weixiaoing"}
        target="_blank"
        rel="noopener noreferrer"
        title="Dawn's GitHub"
      >
        <HoverTag className="flex items-center">
          <GitHub width={24} height={24} alt="Dawn" title="Dawn"></GitHub>
        </HoverTag>
      </a>
    </nav>
  );
}
