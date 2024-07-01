import "prismjs/themes/prism-tomorrow.css";
import "react-notion/src/styles.css";

import Chat from "@/app/_components/chat";
import { NotionRenderer } from "react-notion";

export default async function Article({ params }: { params: { id: string } }) {
  // const data: any = await getPage(params.id).then((res) => res);

  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${params.id}`
  )
    .then((res) => res.json())
    .catch((e) => {
      return;
    });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 768 }}>
      {data && <NotionRenderer  blockMap={data} />}
      <Chat classname="mt-5" room={params.id}></Chat>
    </div>
  );
}
