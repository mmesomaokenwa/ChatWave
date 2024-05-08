import React from 'react'
import SearchResultsTab from './SearchResultsTab';

const SearchResultsLists = ({ query, title, className }) => {
  return (
    <div className={`w-full flex flex-col p-0 gap-3 ${className}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <SearchResultsTab query={query} />
    </div>
  );
}

export default SearchResultsLists