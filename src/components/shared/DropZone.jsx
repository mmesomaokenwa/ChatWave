'use client'

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CardCarousel from "./CardCarousel";
import Image from "next/image";


const DropZone = ({ setValue, valueName, post }) => {
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
      className={`flex flex-col items-center justify-center bg-gray-200 dark:bg-slate-900 rounded-lg ${
        isDragActive && "ring-2 ring-accent"
      } ${isDragReject && "ring-2 ring-red-500"}`}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {postMedia?.length > 0 ? (
        <>
          <CardCarousel
            postMedia={postMedia}
            className="h-80 lg:h-[612px]"
          />
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