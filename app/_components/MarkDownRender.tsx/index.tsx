import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";
const turndownService = new TurndownService();
export default function MarkDownRender({ content }: { content: string }) {
  const md = turndownService.turndown(content);
  return (
    <div id="editor">
      <ReactMarkdown />
      {md}
    </div>
  );
}
