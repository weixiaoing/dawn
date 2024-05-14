import "prismjs/themes/prism-tomorrow.css";
import "react-notion/src/styles.css";

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
      <NotionRenderer blockMap={data} />
    </div>
  );
}
