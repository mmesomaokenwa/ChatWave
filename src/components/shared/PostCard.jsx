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
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import CardCarousel from './CardCarousel';
import PostFooter from './PostFooter';

const PostCard = async ({ post }) => {
  const session = await getServerSession(authOptions);
  const user = session.user

  const timePast = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    if (diffDays > 0) {
      if (diffDays === 1) return `${diffDays} day ago`;
      return `${diffDays} days ago`;
    }
    if (diffHours > 0) {
      if (diffHours === 1) return `${diffHours} hour ago`;
      return `${diffHours} hours ago`;
    }
    if (diffMinutes > 0) {
      if (diffMinutes === 1) return `${diffMinutes} minute ago`;
      return `${diffMinutes} minutes ago`;
    }
    if (diffSeconds > 0) {
      if (diffSeconds === 1) return `${diffSeconds} second ago`;
      return `${diffSeconds} seconds ago`;
    }
  };
  return (
    <Card>
      <CardHeader className="flex-row gap-4">
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
      <CardContent>
        <CardCarousel postMedia={post.media} />
      </CardContent>
      <PostFooter post={post} />
    </Card>
  );
}

export default PostCard