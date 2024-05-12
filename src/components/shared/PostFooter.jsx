'use client'

import React, { useMemo, useState } from 'react'
import { badgeVariants } from "@/components/ui/badge";
import Link from 'next/link';
import { cn, formatText } from '@/lib/utils';
import PostControls from './PostControls';
import { CardFooter } from '@nextui-org/react';

const PostFooter = ({ post }) => {
  return (
    <CardFooter className="flex-col gap-2 p-4 pt-0">
      <PostControls post={post} />
    </CardFooter>
  );
}

export default PostFooter

export const PostCaptionAndTags = ({ post }) => {
  const [show, setShow] = useState(false);
  const formattedCaption = useMemo(() => formatText(post?.caption), [post?.caption]);

  return (
    <>
      {post.caption && (
        <div
          className={cn(
            `w-full text-sm lg:text-[16px] ${
              !show ? "line-clamp-3" : ""
            }`
          )}
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        >
          {formattedCaption}
        </div>
      )}
      {post.tags && (
        <ul className={cn("w-full flex gap-2 justify-end")}>
          {post.tags?.map((tag, index) => (
            <Link
              key={index}
              href={`/explore?query=${tag}&tab=tags`}
              className={cn(`text-tiny ${
                  tag === "" && "hidden"
                }`
              )}
            >
              #{tag}
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};