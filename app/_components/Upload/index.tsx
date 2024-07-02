import { ChangeEventHandler, useState } from "react";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progressList, setProgressList] = useState({ val: [] });
  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    setFiles((pre) => pre.concat(fileArray));
    setProgressList({ val: [] });
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
