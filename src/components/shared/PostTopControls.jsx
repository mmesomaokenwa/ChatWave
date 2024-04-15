'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const PostTopControls = ({ post, addDeleteBtn }) => {
  return (
    <div className="ml-auto flex">
      <Link
        href={`/update-post/${post?._id}`}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <Image src="/assets/edit.svg" alt="edit" width={25} height={25} />
      </Link>
      {addDeleteBtn && (
        <Button variant="ghost">
          <Image src="/assets/delete.svg" alt="delete" width={25} height={25} />
        </Button>
      )}
    </div>
  );
}

export default PostTopControls