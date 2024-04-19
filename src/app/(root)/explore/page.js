import LoadMore from '@/components/shared/LoadMore';
import PostCardList from '@/components/shared/PostCardList';
import Search from '@/components/shared/Search';
import SearchResultsLists from '@/components/shared/SearchResultsLists';
import { getInfiniteScrollPosts, searchForPosts } from '@/lib/mongodb/actions/post.actions';
import { searchForUsers } from '@/lib/mongodb/actions/user.actions';
import React from 'react'

const Explore = async ({ searchParams: { query } }) => {
  const [{ posts }, searchedUsers, searchedPosts] = await Promise.all([
    getInfiniteScrollPosts({ page: 1, limit: 12 }),
    searchForUsers(query),
    searchForPosts(query)
  ])

  console.log({ searchedUsers, searchedPosts })

  const showPosts = posts?.length > 0 && !query;
  return (
    <div className="flex flex-col flex-1 items-center overflow-y-scroll py-6 px-4 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-3xl md:text-2xl font-bold text-left w-full">
          Explore
        </h2>
        <Search />
        <div className="w-full">
          {showPosts && (
            <>
              <PostCardList
                title="Popular Posts"
                posts={posts}
                showFilter
                className={"!p-0"}
              />
              <LoadMore />
            </>
          )}
          {query && (
            <SearchResultsLists title={`Search Results for ${query}`} searchedUsers={searchedUsers} searchedPosts={searchedPosts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore