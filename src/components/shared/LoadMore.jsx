'use client'

import { Loader } from 'lucide-react';
import React from 'react'
import { useInView } from 'react-intersection-observer';

const LoadMore = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  })
  return (
    <div ref={ref} className="mt-4 text-center">
      {/* {!hasNextPage && (
        <p
          hidden={isLoadingPosts || showSearchResults}
          className="text-sm lg:text-base font-medium mt-[-.5rem]"
        >
          No more posts
        </p>
      )} */}
      {/* {isFetchingNextPage && <Loader />} */}
    </div>
  );
}

export default LoadMore