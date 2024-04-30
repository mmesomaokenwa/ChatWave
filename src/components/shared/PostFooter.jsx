'use client'

import React, { useMemo, useState } from 'react'
import { CardFooter } from '../ui/card';
import { badgeVariants } from "@/components/ui/badge";
import Link from 'next/link';
import { cn, formatText } from '@/lib/utils';
import PostControls from './PostControls';

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
            `w-full text-sm lg:text-[16px] font-medium ${
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
              className={cn(
                badgeVariants({ variant: "secondary" }),
                `border-0 p-[.6rem] dark:bg-light-dark dark:text-light ${
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