import Modal from "@/_components/UI/modal";
import Markdown from "markdown-to-jsx";
import { PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

export default function PostModal({
  content,
  children,
}: { content: string } & PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {createPortal(
        <Modal visible={open} onCancel={() => setOpen(false)}>
          <div className="bg-white p-2 w-[800px] h-[500px] overflow-scroll">
            <Markdown className="prose">{content}</Markdown>
          </div>
        </Modal>,
        document.body
      )}
      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
}
