import LoadMore from '@/components/shared/LoadMore';
import PostCardList from '@/components/shared/PostCardList';
import Search from '@/components/shared/Search';
import { getInfiniteScrollPosts } from '@/lib/mongodb/actions/post.actions';
import Image from 'next/image';
import React from 'react'

const Explore = async ({ searchParams }) => {
  const [{ posts }, searchResults] = await Promise.all([
    getInfiniteScrollPosts({ page: 1, limit: 10 }),
    null
  ])

  const showSearchResults = searchResults?.length > 0;
  const showPosts = posts?.length > 0 && !showSearchResults;
  return (
    <div className="flex flex-col flex-1 items-center overflow-y-scroll py-6 px-4 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-3xl md:text-2xl font-bold text-left w-full">
          Explore
        </h2>
        <Search />
        <div className="w-full">
          {showPosts && (
            <PostCardList title="Popular Posts" posts={posts} showFilter spanFullWidth />
          )}
          {showSearchResults && (
            <ul className="w-full flex flex-col gap-8">
              {searchResults?.map((post) => (
                <li className="w-full" key={post._id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
          <LoadMore />
        </div>
      </div>
    </div>
  );
}

export default Explore