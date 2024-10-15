import { BlogData, Result } from "@/_typs/blog";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const notionNew = new Client();
const cache = new Map();
const getBlogList = async ({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}): Promise<Result<BlogData[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/findWithPage`,
      {
        body: JSON.stringify({ skip, limit }),
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    ).then((res) => res.json());
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "获取博客列表失败",
      data: [],
    };
  }
};

const getPost = async (
  postProps: Partial<BlogData>
): Promise<Result<BlogData[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/findPost`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postProps),
      }
    ).then((res) => res.json());

    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      msg: "获取博客列表失败",
      data: [],
    };
  }
};

// const getPage = async (pageId: string) => {
//   const recordMap = await new NotionAPI().getPage(pageId);
//   return recordMap;
// };

export { getBlogList, getPost, notion };
