import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from 'next-auth';
import { cn, timePast } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import CardCarousel from './CardCarousel';
import PostFooter from './PostFooter';

const PostCard = async ({ post }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user

  return (
    <Card>
      <CardHeader className="flex-row gap-4 p-4">
        <Link href={`/profile/${post.creator._id}`}>
          <Image
            className="size-12 rounded-full"
            src={post.creator.profileImage || "/assets/profile-placeholder.svg"}
            alt={post.creator.username}
            width={48}
            height={48}
          />
        </Link>
        <div>
          <Link href={`/profile/${post.creator._id}`}>
            <CardTitle className="font-bold text-sm lg:text-[16px]">
              {post.creator.username}
            </CardTitle>
          </Link>
          <CardDescription className="flex gap-2 text-xs lg:text-sm font-semibold items-center">
            <span>{timePast(post.createdAt)}</span>
            {post.location && <span>&#x2022;</span>}
            {post.location && <span>{post.location}</span>}
          </CardDescription>
        </div>
        {user?.id === post.creator._id.toString() && (
          <Link
            href={`/update-post/${post._id}`}
            className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
          >
            <Image src="/assets/edit.svg" alt="edit" width={25} height={25} />
          </Link>
        )}
      </CardHeader>
      <CardContent className="px-4">
        <CardCarousel postMedia={post.media} />
      </CardContent>
      <PostFooter post={post} />
    </Card>
  );
}

export default PostCard