import React from 'react'
import { Skeleton } from '../ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-14 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="flex gap-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8 ml-auto" />
      </div>
    </div>
  );
}

export default PostSkeleton