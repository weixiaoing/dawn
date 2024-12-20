import Chat from "@/_components/chat";
import Editor from "@/_components/Editor";
import Toc from "@/_components/Toc";
import Card from "@/_components/UI/card";
import { getPost } from "@/utils";
import dayjs from "dayjs";
import "highlight.js/styles/atom-one-dark.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import Summary from "./Summary";
import Tool from "./Tool";
export default async function Article({ params }: { params: { _id: string } }) {
  if (params._id.length == 0) return null;
  const data = await getPost({
    _id: params._id,
  }).then((res) => {
    return res.data?.[0];
  });

  if (!data) return null;

  return (
    <>
      <div className="flex justify-center gap-4 mx-auto max-w-[1024px]">
        <div className="animate-fade-in mx-auto max-w-screen-md flex-1">
          <Card
            className="p-0"
            // cover={
            //   <ErrorImg
            //     src={data?.cover}
            //     errorUrl={
            //       "https://www.notion.so/images/page-cover/nasa_the_blue_marble.jpg"
            //     }
            //   ></ErrorImg>
            // }
            header={
              <>
                <header className="mb-4">
                  <h1 className="text-center mb-4 font-bold text-3xl">
                    {data?.title}
                  </h1>

                  <div className="flex gap-2 text-[12px] justify-center">
                    <li className="flex gap-2">
                      <span className="flex items-center justify-center">
                        <AiOutlineClockCircle />
                      </span>
                      <span>{dayjs(data?.date).format("YYYY年MM月DD日")}</span>
                    </li>
                    {data.tags.length > 0 &&
                      data.tags.map((item) => <li key={item}>#{item}</li>)}
                    <li>阅读量: {data?.watched + ""}</li>
                    <li>点赞数: {data?.like + ""}</li>
                  </div>
                  <Summary data={data.content!}></Summary>
                </header>
              </>
            }
          >
            {<Editor content={data?.content || ""} />}

            {/* <ReactMarkdown>{data.content}</ReactMarkdown> */}
          </Card>

          <Chat className="min-h-[500px]" room={params._id}></Chat>
        </div>
        <main className="w-[200px] mt-[100px] sticky top-[40px]">
          <div
            className=" max-h-[200px] overflow-y-auto  "
            style={{ scrollbarWidth: "none" }}
          >
            <Toc />
          </div>
          <hr
            className="bg-black dark:bg-white my-4 h-[2px] "
            style={{ opacity: 0.3 }}
          />
          <Tool></Tool>
        </main>
      </div>
    </>
  );
}
