import { common, createLowlight } from "lowlight";
import ReactMarkdown from "react-markdown";
import "./index.css";

const lowlight = createLowlight(common);

// const extensions = [
//   StarterKit.configure({
//     codeBlock: false,
//   }),
//   CodeBlockLowlight.configure({
//     lowlight,
//   }).extend({
//     renderHTML() {
//       return ["pre", ["code", 0]];
//     },
//   }),
//   Link.configure({
//     openOnClick: false,
//     autolink: true,
//     defaultProtocol: "https",
//   }),
// ];
interface EditorProps {
  content: string;
  onChange?: (content: string) => void;
}

const Editor = ({ content = "", onChange = () => {} }: EditorProps) => {
  // const editor = useEditor({
  //   extensions,
  //   content: content,
  //   autofocus: true,
  //   onUpdate(props) {
  //     onChange(props.editor.getHTML());
  //   },
  //   editable: false,
  //   immediatelyRender: false,
  // });

  // if (!editor) return null;
  return (
    <>
      <div className=" prose w-full min-w-full p-2" id="editor">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
};

export default Editor;
