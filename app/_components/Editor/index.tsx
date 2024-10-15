"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";

import "./index.css";

const lowlight = createLowlight(common);

const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }).extend({
    renderHTML() {
      return ["pre", ["code", 0]];
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
];
interface EditorProps {
  content: string;
  onChange?: (content: string) => void;
}

const Editor = ({ content = "", onChange = () => {} }: EditorProps) => {
  const editor = useEditor({
    extensions,
    content: content,
    autofocus: true,
    onUpdate(props) {
      onChange(props.editor.getHTML());
    },
    editable: false,
    immediatelyRender: false,
  });
  if (!editor) return null;
  return (
    <>
      <EditorContent
        id="editor"
        className="prose dark:prose-invert max-w-full"
        onClick={() => {
          editor?.chain().focus().run();
        }}
        editor={editor}
        style={{ minHeight: "500px" }}
      />
    </>
  );
};

export default Editor;
