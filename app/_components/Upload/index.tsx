import { ChangeEventHandler, useState } from "react";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progressList, setProgressList] = useState({ val: [] });
  //  文件捆绑 切片过程放入worker现场会因为非transfer对象导致性能消耗 文件过大会导致内存溢出
  const chunkFile = (file: File, size = 1024 * 1024 * 4) => {
    // 文件分割
    const sliceFile = (file: File, size = 1024 * 1024 * 4) => {
      const chunk: Blob[] = [];
      for (let i = 0; i < file.size; i += size) {
        chunk.push(file.slice(i, i + size));
      }
      return chunk;
    };
    // 转化bufferarray数组
    async function blobArrayToArrayBuffer(chunks: Blob[]) {
      return Promise.all(chunks.map((chunk) => chunk.arrayBuffer()));
    }
    // const chunks = await blobArrayToArrayBuffer(sliceFile(file, size));
    const chunks = sliceFile(file, size);
    return chunks;
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
