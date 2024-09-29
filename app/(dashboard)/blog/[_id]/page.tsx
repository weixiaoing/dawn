import Chat from "@/_components/chat";
import Card from "@/_components/UI/card";
import { getPost } from "@/utils";
import "highlight.js/styles/atom-one-dark.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
export default async function Article({ params }: { params: { _id: string } }) {
  if (typeof window == "undefined") {
    console.log("server component");
  } else {
    console.log("client component");
  }
  if (params._id.length == 0) return null;
  const data = await getPost({
    _id: params._id,
  }).then((res) => {
    return res.data?.[0];
  });

  return (
    <div className="animate-fade-in">
      <Card
        cover={
          <div className="w-full">
            <img
              className=" h-[200px] w-full "
              src={"https://www.notion.so/images/page-cover/solid_beige.png"}
              srcSet={data.cover}
            />
          </div>
        }
        header={
          <>
            <h1 className="text-[40px]   dark:text-black">{data?.title}</h1>
          </>
        }
      >
        {data && (
          <ReactMarkdown
            className="prose p-0 prose-zinc dark:prose-invert "
            rehypePlugins={[rehypeHighlight]}
          >
            {data.content}
          </ReactMarkdown>
        )}
        <Chat classname="mt-5" room={params._id}></Chat>
      </Card>
    </div>
  );
}
