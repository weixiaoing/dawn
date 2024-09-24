import { BlogData, Result } from "@/_typs/blog";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const notionNew = new Client();
const cache = new Map();
// const getBlogList = async () => {
//   try {
//     if (cache.has("blogList")) {
//       const res = cache.get("blogList");

//       return res;
//     }
//     let res = await notion.databases.query({
//       database_id: process.env.NOTION_ID!,
//       filter: {
//         and: [
//           {
//             property: "status",
//             select: {
//               equals: "Published",
//             },
//           },
//           {
//             property: "type",
//             select: {
//               equals: "Post",
//             },
//           },
//         ],
//       },
//       sorts: [
//         {
//           property: "date",
//           direction: "descending",
//         },
//       ],
//     });
//     const data = (res.results as any[]).map((item) => {
//       return {
//         id: item.id,
//         created_time: item?.created_time,
//         title: item?.properties.title.title[0].plain_text,
//       };
//     });
//     cache.set("blogList", data);
//     return data;
//   } catch (error) {
//     return [];
//   }
// };
const getBlogList = async (): Promise<Result<BlogData[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/findPostMeta`,
      {
        method: "get",
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
