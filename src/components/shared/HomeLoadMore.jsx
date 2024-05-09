'use client'

import { useInfiniteHomePosts } from '@/lib/react-query/queries'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PostCard from './PostCard'
import Loader from './Loader'

const HomeLoadMore = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  const { data: posts, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteHomePosts()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])
  return (
    <>
      {posts?.length > 0 && posts.map((post) => <PostCard post={post} key={post._id} />)}
      <div
        ref={ref}
        className="text-center flex items-center justify-center"
      >
        {!hasNextPage && (
          <p className="text-sm lg:text-base font-medium">No more posts</p>
        )}
        {isFetchingNextPage && <Loader className={'size-5'} />}
      </div>
    </>
  );
}

export default HomeLoadMore