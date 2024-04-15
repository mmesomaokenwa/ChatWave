'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import LikeCard from './LikeCard';
import CommentCard from './CommentCard';

const LikesAndCommentsList = ({ post, userId, className }) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <Select defaultValue="0" className="w-[150px]" onValueChange={setSelected}>
        <SelectTrigger className="w-fit focus-visible:ring-0 focus-visible:ring-offset-0">
          <SelectValue className="ml-4" placeholder="Likes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="0"
          >
            Likes
          </SelectItem>
          <SelectItem
            value="1"
          >
            Comments
          </SelectItem>
        </SelectContent>
      </Select>
      <ul className="gap-2 flex">
        {selected === '0' && (
          <>
            {post?.likes?.map((like, index) => (
            <LikeCard key={index} like={like} userId={userId} />
          ))}
          </>
        )}
        {selected === '1' && (
          <>
            {post?.comments?.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default LikesAndCommentsList