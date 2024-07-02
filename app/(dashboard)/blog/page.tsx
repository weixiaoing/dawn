import BlogList from "@/_components/BlogList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog",
  description: "just do it!",
};
export default function Blog() {
  return (
    <div className=" pt-10">
      <BlogList />
    </div>
  );
}
