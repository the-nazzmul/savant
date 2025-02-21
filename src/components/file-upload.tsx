"use client";

import { InboxIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  return (
    <div className="p-2 rounded-xl flex justify-center">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer py-8 flex justify-center items-center flex-col bg-neutral-900 min-w-[350px] ",
        })}
      >
        <input {...getInputProps()} />
        <>
          <InboxIcon className="size-10" />
          <p className="mt-2 text-sm text-neutral-400">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
