import React from 'react'
import CardCarousel from './CardCarousel'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { PostDescription, PostProfileImage, PostTitle } from './PostCard';
import { PostCaptionAndTags } from './PostFooter';
import PostTopControls from './PostTopControls';
import PostControls from './PostControls';
import ViewLikes from './ViewLikes';
import ViewComments from './ViewComments';

const PostDetailsCard = ({ post, userId }) => {
  const isOwner = userId === post.creator._id.toString();
  return (
    <div className="w-full flex items-stretch flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 hidden lg:flex">
        <CardCarousel postMedia={post?.media} className={"grow"} />
      </div>
      <Card className="w-full lg:w-1/2 border-0">
        <CardHeader className="flex-row gap-4 p-4">
          <PostProfileImage post={post} />
          <div>
            <PostTitle post={post} />
            <PostDescription post={post} isFullDate />
          </div>
          {isOwner && <PostTopControls post={post} addDeleteBtn />}
        </CardHeader>
        <div className="px-4 flex flex-col gap-3">
          <PostCaptionAndTags post={post} />
        </div>
        <CardContent className="px-4 mt-3 lg:hidden">
          <CardCarousel postMedia={post.media} />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <PostControls post={post} />
        </CardFooter>
        <div className="w-full p-4 flex justify-between border-b-2">
          <ViewLikes likes={post.likes} />
          <ViewComments comments={post.comments} />
        </div>
      </Card>
    </div>
  );
}

export default PostDetailsCard