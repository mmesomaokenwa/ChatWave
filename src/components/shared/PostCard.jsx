import React from 'react'
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
import { Card, CardBody, CardFooter, CardHeader, User } from '@nextui-org/react';

const PostCard = async ({ post }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user

  return (
    <Card className="rounded-none md:rounded-3xl bg-card border border-divider">
      <PostCardWrapper postId={post._id}>
        <CardHeader className="flex-row gap-4 px-4 lg:p-4">
          <Link href={`/profile/${post.creator._id}`}>
            <User
              avatarProps={{
                src:
                  post?.creator?.profileImage ||
                  "/assets/profile-placeholder.svg",
                size: "md",
              }}
              name={post?.creator?.name}
              description={
                <>
                  <span>{timePast(post.createdAt)}</span>
                  {post.location && <span className="mx-1">&#x2022;</span>}
                  {post.location && <span>{post.location}</span>}
                </>
              }
              classNames={{
                name: "font-medium",
              }}
            />
          </Link>
          {user?.id === post.creator._id.toString() && (
            <PostTopControls post={post} />
          )}
        </CardHeader>
      </PostCardWrapper>
      <CardBody className="px-4 flex flex-col gap-1">
        <PostCaptionAndTags post={post} />
        <CardCarousel
          postMedia={post.media}
          radius={"lg"}
          size={"max-h-[300px]"}
        />
      </CardBody>
      <CardFooter className="p-4 pt-0">
        <PostControls post={post} />
      </CardFooter>
    </Card>
  );
}

export default PostCard