import { Nav } from "./Nav";
import { ScrollTop } from "./ScollTop";

export function Header() {
  return (
    <header className="border-b z-9999 dark:border-zinc-800 sticky top-0 left-0 w-full dark:bg-gray-900 bg-zinc-50 ">
      <ScrollTop />
      <Nav></Nav>
    </header>
  );
}
