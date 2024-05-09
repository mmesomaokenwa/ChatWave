import PostSkeleton from '@/components/shared/PostSkeleton';
import React from 'react'

const LoadingPage = () => {
  return (
    <main className="flex flex-1 py-24 px-0 md:px-8 lg:p-14">
      <ul className="w-full flex flex-col gap-6 mt-12">
        {[...Array(3).keys()].map((key) => (
          <li key={key} className="w-full">
            <PostSkeleton />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default LoadingPage