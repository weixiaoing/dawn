"use client";
import { useEffect, useState } from "react";
import BlogList from "../_components/BlogList";
import { BlogData } from "../_typs/blog";

export default function Blog() {
  const [list, setList] = useState<BlogData[]>([]);

  useEffect(() => {
    let res = fetch("api").then((res) =>
      res.json().then((res) => setList(res.data))
    );
  }, []);
  return (
    <div className="pt-10">
      <BlogList arr={list} />
    </div>
  );
}
