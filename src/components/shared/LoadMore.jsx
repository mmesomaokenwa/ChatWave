'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import PostCardList from './PostCardList';
import { useInfiniteScrollPosts } from '@/lib/react-query/queries';
import Loader from './Loader';

const LoadMore = ({timeline, showPostIndicator}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const { data: posts, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteScrollPosts({limit: 12, timeline})

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])
  return (
    <>
      {posts?.length > 0 && (
        <PostCardList posts={posts} className={"!p-0 !pt-4"} />
      )}
      <div
        ref={ref}
        className="mt-4 text-center flex items-center justify-center"
      >
        {!hasNextPage && showPostIndicator && (
          <p className="text-sm lg:text-base font-medium">No more posts</p>
        )}
        {isFetchingNextPage && <Loader className={'size-5'} />}
      </div>
    </>
  );
}

export default LoadMore