"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { error } from "console";
import { toast } from "sonner";

type FileUploadProps = {
  onChange: (url?: string) => void;
  endpoint: "profileImageUploader" | "postImageUploader";
};

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res[0].url) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
      }}
    />
  );
};

export default FileUpload;
