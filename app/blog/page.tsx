import BlogList from "../_components/BlogList";

export default function Blog() {
  const arr = Array.from({ length: 100 }).map((_, i) => "这是博客标题" + i);
  return (
    <div className="pt-10">
      <BlogList arr={arr} />
    </div>
  );
}
