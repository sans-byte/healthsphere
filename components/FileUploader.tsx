"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="file-upload"
          className="m-h-[400px] overflow-hidden object-cover"
          width={1000}
          height={1000}
        ></Image>
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="file-uploader"
            width={40}
            height={40}
          ></Image>
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500"> Click or drag and drop</span>
            </p>
            <p className="text-14-regular tracking-wide">
              SVG,PNG,Gif or JPG (max 800 X 400)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
