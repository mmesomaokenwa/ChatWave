'use client'

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CardCarousel from "./CardCarousel";
import Image from "next/image";
import { cn } from "@/lib/utils";


const DropZone = ({ setValue, valueName, post, error }) => {
  const [postMedia, setPostMedia] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setValue(valueName, acceptedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPostMedia(acceptedFiles);
  }, [setValue, valueName]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: "image/*, video/*",
  });

  useEffect(() => {
    setPostMedia(post?.media);
  }, [post?.media]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        `flex flex-col items-center justify-center bg-default-100 hover:bg-default transition rounded-lg ${
          error && "bg-danger-50 hover:bg-danger-100"
        } ${isDragActive && "ring-2 ring-accent"} ${
          isDragReject && "ring-2 ring-red-500"
        }`
      )}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {postMedia?.length > 0 ? (
        <>
          <CardCarousel postMedia={postMedia} size="h-80 lg:h-[400px]" ratio={'aspect-video'} />
          <p className="text-gray text-sm mb-2">
            Click to change or drag and drop
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-7 h-80 lg:h-[612px]">
          <Image
            src="/assets/file-upload.svg"
            alt="upload"
            height={77}
            width={96}
          />
          <p className="text-gray">Drag and drop images or videos here</p>
          <p className="text-gray">or</p>
          <p
            role="button"
            className="btn btn-ghost bg-gray dark:bg-dark-2 text-accent hover:bg-light-dark transition"
          >
            Browse files
          </p>
        </div>
      )}
    </div>
  );
};

export default DropZone;