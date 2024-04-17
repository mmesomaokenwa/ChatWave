import PostPreviewCard from '@/components/shared/PostPreviewCard';
import authOptions from '@/lib/authOptions';
import { getSavedPostsByUserId } from '@/lib/mongodb/actions/post.actions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react'

const SavedPosts = async () => {
  const user = await getServerSession(authOptions).then(res => res?.user)
  const savedPosts = await getSavedPostsByUserId({ userId: user?.id });
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-8 px-5 md:px-8 lg:p-14">
        <div className="max-w-5xl w-full flex justify-start gap-3">
          <Image
            src="/assets/save.svg"
            alt="add"
            height={36}
            width={36}
            className="invert brightness-200 dark:brightness-0"
          />
          <h2 className="text-3xl md:text-2xl font-bold">Saved Posts</h2>
        </div>
        <div className="w-full flex gap-2 justify-end">
          <p className="text-sm lg:text-base font-medium">View All</p>
          <Image src="/assets/filter.svg" alt="filter" width={20} height={20} />
        </div>
        <div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-4">
          {savedPosts?.reverse().map((save) => (
            <PostPreviewCard
              key={save._id}
              post={save}
              showUser={true}
              showStatControls={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedPosts