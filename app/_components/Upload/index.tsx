import { ChangeEventHandler, useState } from "react";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progressList, setProgressList] = useState({ val: [] });
  // 分片上传
  const chunkFile = (file: File, size = 1024 * 1024 * 4) => {
    const chunk = [];
    for (let i = 0; i < file.size; i += size) {
      chunk.push(file.slice(i, i + size));
    }

    return chunk;
  };

  const uploadFile = (chunks: Blob[]) => {
    const List = [];
    for (let i = 0; i < chunks.length; i++) {
      const formData = new FormData();
      formData.append("index", i.toString());
      formData.append("total", chunks.length.toString());
      formData.append("fileName", "file");
      formData.append("img", chunks[i]);
      List.push(
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: "post",
          body: formData,
        })
      );
    }

    Promise.all(List).then((res) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/merge`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: "name", total: chunks.length }),
      }).then((res) => {
        console.log(res);
      });
    });
  };

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files![0];
    if (!files) return;
    const chunks = chunkFile(files);

    uploadFile(chunks);
  };

  return (
    <div>
      <input
        type="file"
        id="fileUpLoad"
        style={{ display: "none" }}
        multiple
        onChange={handleFileInput}
      />
      <label htmlFor="fileUpLoad">
        <span className="cursor-pointer border p-1">Upload</span>
      </label>
      <section className="space-y-2">
        {" "}
        {files.map((file, index) => (
          <div
            className="flex justify-between border rounded p-1"
            key={file.lastModified}
          >
            {file.name}
            <button
              onClick={() => {
                console.log(file);
              }}
            >
              confirm
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FileUploader;
