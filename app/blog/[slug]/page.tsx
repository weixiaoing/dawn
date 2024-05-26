import "prismjs/themes/prism-tomorrow.css";
import "react-notion/src/styles.css";

import Chat from "@/app/_components/chat";
import { NotionRenderer } from "react-notion";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${params.slug}`
  )
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });

  return (
    <div style={{ maxWidth: 768 }}>
      {data && <NotionRenderer blockMap={data} />}
      <Chat room={params.slug}></Chat>
    </div>
  );
}
