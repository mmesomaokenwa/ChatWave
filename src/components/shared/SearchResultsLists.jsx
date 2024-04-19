import React from 'react'
import SearchResultsTab from './SearchResultsTab';

const SearchResultsLists = ({ searchedPosts, searchedUsers, title, className }) => {
  return (
    <div className={`w-full flex flex-col p-0 gap-3 ${className}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <SearchResultsTab searchedPosts={searchedPosts} searchedUsers={searchedUsers} />
      {/* <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedPosts?.map((post, index) => (
          <PostPreviewCard key={index} post={post} />
        ))}
      </div> */}
    </div>
  );
}

export default SearchResultsLists