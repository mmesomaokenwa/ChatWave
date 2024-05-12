import React from 'react'
import CardCarousel from './CardCarousel'
import { PostCaptionAndTags } from './PostFooter';
import PostTopControls from './PostTopControls';
import PostControls from './PostControls';
import ViewLikes from './ViewLikes';
import ViewComments from './ViewComments';
import { Card, CardBody, CardFooter, CardHeader, User } from '@nextui-org/react';
import { formatDateString } from '@/lib/utils';
import { Separator } from '../ui/separator';

const PostDetailsCard = ({ post, userId }) => {
  const isOwner = userId === post.creator._id.toString();
  return (
    <div className="w-full flex flex-col h-max lg:flex-row">
      <div className="w-full grow lg:w-1/2 hidden lg:flex">
        <CardCarousel postMedia={post?.media} size={"lg:h-[350px]  w-full"} radius={'none'} className={'lg:rounded-l-xl'} />
      </div>
      <Card className="w-full h-full lg:w-1/2 border-0 rounded-none lg:rounded-r-xl">
        <CardHeader className="flex-row gap-4 px-4 lg:p-4">
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
                <span>{formatDateString(post.createdAt)}</span>
                {post.location && <span className="mx-1">&#x2022;</span>}
                {post.location && <span>{post.location}</span>}
              </>
            }
            classNames={{
              name: "font-medium",
            }}
          />
          {isOwner && <PostTopControls post={post} addDeleteBtn />}
        </CardHeader>
        <div className="px-4 flex flex-col gap-1">
          <PostCaptionAndTags post={post} />
        </div>
        <CardBody className="px-4 mt-0 lg:hidden">
          <CardCarousel postMedia={post.media} />
        </CardBody>
        <CardFooter className="p-4 pt-0 lg:mt-auto">
          <PostControls post={post} />
        </CardFooter>
        <Separator />
        <div className="w-full p-4 flex justify-between mt-auto border-b-2 lg:border-b-0">
          <ViewLikes likes={post.likes} />
          <ViewComments comments={post.comments} />
        </div>
      </Card>
    </div>
  );
}

export default PostDetailsCard