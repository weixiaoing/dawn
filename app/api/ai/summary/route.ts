import type { NextRequest } from "next/server";
import openai from "../config";

export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
  const { data, language } = await req.json();

  const text = data as string;
  const lang = language || ("zh" as string);

  // 查询数据库中是否有summary

  // if (sqlResult.rows.length > 0) {
  //   return new Response(
  //     JSON.stringify({
  //       summary: sqlResult.rows[0].summary,
  //       source: "db-cache",
  //     }),
  //     {
  //       status: 200,
  //       headers: {
  //         "content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   );
  // }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Summarize this in "${lang}" language:
"${text}"

CONCISE SUMMARY:`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const summary = completion.choices[0].message.content;

  //todo  插入数据库
  // await sql`insert into summary (api_endpoint, summary, lang, modified, cid) values (${API_URL}, ${summary}, ${lang}, ${modified}, ${cid})`;

  return new Response(
    JSON.stringify({
      summary,
      source: "openai",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
};
