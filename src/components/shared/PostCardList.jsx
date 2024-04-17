import React from 'react'
import PostPreviewCard from './PostPreviewCard'
import Image from 'next/image';

const PostCardList = ({ title, posts, showFilter, spanFullWidth }) => {
  return (
    <div className={`w-full flex flex-col ${spanFullWidth ? 'p-0' : 'p-4'}`}>
      <div className="w-full flex items-center justify-between py-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {showFilter && (
          <div className="flex items-center gap-4">
            <p className="text-sm lg:text-base font-medium">View All</p>
            <Image
              src="/assets/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post, index) => (
          <PostPreviewCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostCardList