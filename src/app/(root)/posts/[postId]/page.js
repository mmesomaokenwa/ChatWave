import PostCardList from '@/components/shared/PostCardList';
import PostDetailsCard from '@/components/shared/PostDetailsCard';
import authOptions from '@/lib/authOptions';
import { getPostById } from '@/lib/mongodb/actions/post.actions';
import { getServerSession } from 'next-auth';
import React from 'react'

const PostDetails = async ({ params: { postId } }) => {
  const user = await getServerSession(authOptions).then(res => res?.user)
  const { post, relatedPosts } = await getPostById(postId);
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center overflow-y-scroll py-8 px-0 md:px-8 lg:p-14">
        <PostDetailsCard post={post} userId={user?.id} />
        {relatedPosts && (
          <PostCardList title="More Related Posts" posts={relatedPosts} />
        )}
      </div>
    </div>
  );
}

export default PostDetails