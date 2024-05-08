import LoadMore from '@/components/shared/LoadMore';
import PostCardList from '@/components/shared/PostCardList';
import Search from '@/components/shared/Search';
import SearchResultsLists from '@/components/shared/SearchResultsLists';
import { getInfiniteScrollPosts } from '@/lib/mongodb/actions/post.actions';
import React from 'react'

const Explore = async ({ searchParams: { query, date } }) => {
  const postPromise = getInfiniteScrollPosts({ page: 1, limit: 12, timeline: date })
  const posts = await postPromise

  return (
    <div className="flex flex-col flex-1 items-center overflow-y-scroll py-6 px-4 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-3xl md:text-2xl font-bold text-left w-full">
          Explore
        </h2>
        <Search />
        <div className="w-full">
          {query ? (
            <SearchResultsLists
              title={`Search Results for ${query}`}
              query={query}
            />
          ) : (
            <>
              <PostCardList
                title="Popular Posts"
                posts={posts}
                showFilter
                className={"!p-0"}
              />
              <LoadMore timeline={date} showPostIndicator={posts?.length > 0} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore