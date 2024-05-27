import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const notionNew = new Client();

const getBlogList = async () => {
  try {
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
