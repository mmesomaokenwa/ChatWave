'use client'

import { checkIsLiked, formatNumber } from '@/lib/utils';
import { useSocket } from '@/providers/SocketProvider';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { likePost } from '@/lib/mongodb/actions/post.actions';

const LikeButton = ({ post, className }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { emit } = useSocket();
  const [likes, setLikes] = useState(
    post.likes.map((like) => like?._id?.toString() || like)
  );
  const [liked, setLiked] = useState(false);
  const isLiked = useMemo(
    () => checkIsLiked(likes, user?.id),
    [likes, user?.id]
  );
  
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLike = () => {
    try {
      let isLiked;

      if (liked) {
        setLiked(false);
        setLikes((prev) => prev.filter((like) => like !== user?.id));
        isLiked = false;
      } else {
        setLiked(true);
        setLikes((prev) => [...prev, user?.id]);
        isLiked = true;
      }

      likePost({
        postId: post._id,
        userId: user?.id,
        liked: isLiked,
        creatorId: post.creator._id,
        path: [`/posts/${post._id}`, "/"],
      }).then(({ notification }) => {
        if (notification)
          emit("likePost", {
            ...notification,
            sender: user,
            post,
          });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`flex items-center rounded-full ${className}`}>
      <Button variant="ghost" size="sm" onClick={handleLike} className='p-0'>
        <Image
          src={liked ? "/assets/liked.svg" : "/assets/like.svg"}
          alt="like"
          width={23}
          height={23}
        />
      </Button>
      {likes.length > 0 && (
        <p className="text-sm ml-2">
          {formatNumber(likes.length)}
        </p>
      )}
    </div>
  );
}

export default LikeButton