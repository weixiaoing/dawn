import { getBlogList } from "../utils";

export async function GET() {
  const data = await getBlogList();
  return Response.json({ data });
}
