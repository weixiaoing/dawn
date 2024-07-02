import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const notionNew = new Client();
const cache = new Map();
const getBlogList = async () => {
  try {
    if (cache.has("blogList")) {
      return cache.get("blogList");
    }
    let res = await notion.databases.query({
      database_id: process.env.NOTION_ID!,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "type",
            select: {
              equals: "Post",
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });
    const data = (res.results as any[]).map((item) => {
      return {
        id: item.id,
        title: item?.properties.title.title[0].plain_text,
      };
    });
    cache.set("blogList", data);
    return data;
  } catch (error) {
    return [];
  }
};

const getPage = async (pageId: string) => {
  const recordMap = await new NotionAPI().getPage(pageId);
  return recordMap;
};

export { getBlogList, getPage, notion };
