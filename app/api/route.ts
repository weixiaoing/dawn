import { notion } from "../utils";

export async function GET() {
  let res = await notion.databases.query({
    database_id: process.env.NOTION_ID!,
  });
  try {
    const data = res.results.filter((item: any) => {
      // console.log(item.properties.status.select.name);

      return item.properties.status.select?.name === "Published";
    });
    return Response.json({ data });
  } catch (e) {
    console.log(e);
  }
}
