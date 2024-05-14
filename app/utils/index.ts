import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const getBlogList = async () => {
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
};
export { getBlogList, notion };
