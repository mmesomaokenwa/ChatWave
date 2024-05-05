import React from 'react'
import SearchResultsTab from './SearchResultsTab';

const SearchResultsLists = ({ searchedPosts, searchedUsers, title, className }) => {
  return (
    <div className={`w-full flex flex-col p-0 gap-3 ${className}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <SearchResultsTab searchedPosts={searchedPosts} searchedUsers={searchedUsers} />
    </div>
  );
}

export default SearchResultsLists