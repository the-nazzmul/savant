"use client";

import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key: file_key,
        file_name: file_name,
      });
      return response.data;
    },
  });
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
        setIsUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (err) => {
            toast.error("Error creating chat");
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
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
        {isUploading || isPending ? (
          <>
            <Loader2Icon className="size-10 text-neutral-400 animate-spin" />
            <p className="mt-2 text-sm text-neutral-400">
              Processing your file...
            </p>
          </>
        ) : (
          <>
            <InboxIcon className="size-10 text-neutral-400" />
            <p className="mt-2 text-sm text-neutral-400">Drop PDF here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
