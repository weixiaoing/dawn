import { Nav } from "./Nav";
import { ScrollTop } from "./ScollTop";

export function Header() {
  return (
    <header>
      <ScrollTop />
      <Nav></Nav>
      {/* <div className="fixed left-0 top-0 bg- w-full h-screen"></div> */}
    </header>
  );
}
