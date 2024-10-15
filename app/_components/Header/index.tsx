import { Nav } from "./Nav";
import { ScrollTop } from "./ScollTop";

export function Header() {
  return (
    <header className="border-b dark:border-none z-20 w-full mb-10  ">
      <ScrollTop />
      <Nav></Nav>
    </header>
  );
}
