import React from 'react'
import { Skeleton } from '../ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default PostSkeleton