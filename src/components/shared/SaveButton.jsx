'use client'

import { savePost } from '@/lib/mongodb/actions/post.actions';
import { checkIsSaved } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';

const SaveButton = ({ post, className }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [saves, setSaves] = useState(post.saves);
  const [saved, setSaved] = useState(false);
  const isSaved = useMemo(
    () => checkIsSaved(saves, user?.id),
    [saves, user?.id]
  );

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = () => {
    try {
      if (saved) {
        setSaved(false)
        // setSaves(prev => prev.filter((save) => save !== user?.id))
      } else {
        setSaved(true)
        // setSaves(prev => [...prev, user?.id])
      }

      savePost({
        postId: post._id,
        userId: user?.id,
        path: [
          "/",
          `/posts/${post._id}`,
          "/saved"
        ],
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleSave} className={`rounded-full ${className}`}>
      <Image
        src={saved ? "/assets/saved.svg" : "/assets/save.svg"}
        alt="like"
        width={23}
        height={23}
      />
    </Button>
  );
}

export default SaveButton