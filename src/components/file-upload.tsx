"use client";

import { uploadToS3 } from "@/lib/s3";
import { InboxIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large");
        return;
      }
      try {
        const data = await uploadToS3(file);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
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
          <InboxIcon className="size-10 text-neutral-400" />
          <p className="mt-2 text-sm text-neutral-400">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
