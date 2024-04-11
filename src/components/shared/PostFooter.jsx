'use client'

import React, { useState } from 'react'
import { CardFooter } from '../ui/card';

const PostFooter = ({ post }) => {
  const [show, setShow] = useState(false);
  return (
    <CardFooter>
      {post.caption && (
        <p
          className={`text-sm lg:text-[16px] font-medium ${
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
        <ul className="flex gap-2 justify-end">
          {post.tags?.map((tag, index) => (
            <li
              key={index}
              className={`badge badge-sm badge-ghost border-0 p-[.6rem] dark:bg-light-dark dark:text-light ${
                tag === "" && "hidden"
              }`}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </CardFooter>
  );
}

export default PostFooter