import { notion } from "@/app/utils";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  let res = await notion.blocks.children.list({ block_id: params.slug });
  const data = res.results;

  return <div>文章内容</div>;
}
