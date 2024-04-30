import { notion } from "../utils";

export async function GET() {
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
  return Response.json({ data });
  // try {
  //   const data = res.results.filter((item: any) => {
  //     // console.log(item.properties.status.select.name);

  //     return item.properties.status.select?.name === "Published";
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
}
