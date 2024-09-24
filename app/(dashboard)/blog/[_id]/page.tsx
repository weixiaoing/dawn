import Chat from "@/_components/chat";
import Card from "@/_components/UI/card";
import { getPost } from "@/utils";
import "highlight.js/styles/atom-one-dark.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
export default async function Article({ params }: { params: { _id: string } }) {
  if (params._id.length == 0) return null;
  const data = await getPost({
    _id: params._id,
  }).then((res) => {
    return res.data?.[0];
  });
  console.log(data);

  // const data = await fetch(
  //   `https://notion-api.splitbee.io/v1/page/${params.id}`
  // )
  //   .then((res) => res.json())
  //   .catch((e) => {
  //     return;
  //   });

  return (
    <div className="animate-fade-in">
      <Card>
        {data && (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {data.content}
          </ReactMarkdown>
        )}
        <Chat classname="mt-5" room={params._id}></Chat>
      </Card>
    </div>
  );
}
