"use client";
import { FaRobot } from "react-icons/fa";

import Card from "@/_components/UI/card";
import { useEffect, useState } from "react";

export default function Summary({ data }: { data: string }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetch(`/api/ai/summary`, {
      method: "POST",
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSummary(res.summary);
      });
  }, [data]);
  return (
    <Card
      border
      className="mt-4 bg-white"
      header={
        <span className="text-sm flex  space-x-2">
          <span className="flex items-center justify-center">
            <FaRobot className="text-blue-300" />
          </span>{" "}
          <span>AI生成的摘要</span>
        </span>
      }
    >
      <p className="text-[12px] mb-10 text-black/85 ">{summary}</p>
    </Card>
  );
}
