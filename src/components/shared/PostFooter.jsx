'use client'

import React, { useState } from 'react'
import { CardFooter } from '../ui/card';
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PostControls from './PostControls';

const PostFooter = ({ post }) => {
  const [show, setShow] = useState(false);
  return (
    <CardFooter className="flex-col gap-2">
      {post.caption && (
        <p
          className={`w-full text-sm lg:text-[16px] font-medium ${
            !show ? "line-clamp-3" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        >
          {post.caption}
        </p>
      )}
      {post.tags && (
        <ul className="w-full flex gap-2 justify-end">
          {post.tags?.map((tag, index) => (
            <Link
              key={index}
              href={`/tag/${tag}`}
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
      <PostControls post={post} />
    </CardFooter>
  );
}

export default PostFooter