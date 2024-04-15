import React from 'react'
import CardCarousel from './CardCarousel'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { PostDescription, PostProfileImage, PostTitle } from './PostCard';
import { PostCaptionAndTags } from './PostFooter';
import PostTopControls from './PostTopControls';
import LikesAndCommentsList from './LikesAndCommentsList';
import PostControls from './PostControls';

const PostDetailsCard = ({ post, userId }) => {
  const isOwner = userId === post.creator._id.toString();
  return (
    <div className="w-full flex items-stretch flex-col md:flex-row">
      <div className="w-full md:w-1/2 hidden md:flex">
        <CardCarousel postMedia={post?.media} className={"grow !h-full"} />
      </div>
      <Card className="w-full md:w-1/2">
        <CardHeader className="flex-row gap-4 p-4">
          <PostProfileImage post={post} />
          <div>
            <PostTitle post={post} />
            <PostDescription post={post} />
          </div>
          {isOwner && <PostTopControls post={post} addDeleteBtn />}
        </CardHeader>
        <div className="px-4 flex flex-col gap-3">
          <PostCaptionAndTags post={post} />
          <LikesAndCommentsList
            post={post}
            userId={userId}
            className="hidden md:flex"
          />
        </div>
        <CardContent className="px-4 mt-3 md:hidden">
          <CardCarousel postMedia={post.media} />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <PostControls post={post} />
        </CardFooter>
      </Card>
      <LikesAndCommentsList
        post={post}
        userId={userId}
        className="w-full md:hidden"
      />
    </div>
  );
}

export default PostDetailsCard