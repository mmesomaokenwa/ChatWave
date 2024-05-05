import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from 'next-auth';
import { formatDateString, timePast } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import CardCarousel from './CardCarousel';
import { PostCaptionAndTags } from './PostFooter';
import PostTopControls from './PostTopControls';
import PostControls from './PostControls';
import PostCardWrapper from './PostCardWrapper';

const PostCard = async ({ post }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user

  return (
    <Card>
      <PostCardWrapper postId={post._id}>
        <CardHeader className="flex-row gap-4 p-4">
          <PostProfileImage post={post} />
          <div>
            <PostTitle post={post} />
            <PostDescription post={post} />
          </div>
          {user?.id === post.creator._id.toString() && (
            <PostTopControls post={post} />
          )}
        </CardHeader>
      </PostCardWrapper>
      <CardContent className="px-4 flex flex-col gap-3">
        <PostCaptionAndTags post={post} />
        <CardCarousel postMedia={post.media} />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <PostControls post={post} />
      </CardFooter>
    </Card>
  );
}

export default PostCard

export const PostTitle = ({ post }) => (
  <Link href={`/profile/${post.creator._id}`}>
    <CardTitle className="font-bold text-sm lg:text-[16px]">
      {post.creator.username}
    </CardTitle>
  </Link>
);

export const PostDescription = ({ post, isFullDate }) => (
  <CardDescription className="flex gap-2 text-xs lg:text-sm font-semibold items-center">
    <span>
      {isFullDate ? formatDateString(post.createdAt) : timePast(post.createdAt)}
    </span>
    {post.location && <span>&#x2022;</span>}
    {post.location && <span>{post.location}</span>}
  </CardDescription>
);

export const PostProfileImage = ({ post }) => (
  <Link href={`/profile/${post.creator._id}`}>
    <Image
      className="size-12 rounded-full"
      src={post.creator.profileImage || "/assets/profile-placeholder.svg"}
      alt={post.creator.username}
      width={48}
      height={48}
    />
  </Link>
);