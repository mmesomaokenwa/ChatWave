import React from 'react'
import PostPreviewCard from './PostPreviewCard'
import PostCardListFilter from './PostCardListFilter';

const PostCardList = ({ title, posts, showFilter, className }) => {
  return (
    <div className={`w-full flex flex-col p-4 ${className}`}>
      {title && (
        <div className="w-full flex items-center justify-between py-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {showFilter && <PostCardListFilter />}
        </div>
      )}
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.length < 1 ? (
          <p className="col-span-2 lg:col-span-3 text-center mt-4">No posts under this category</p>
        ) : (
          posts?.map((post, index) => (
            <PostPreviewCard key={index} post={post} showControls />
          ))
        )}
      </div>
    </div>
  );
}

export default PostCardList