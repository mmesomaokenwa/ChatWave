import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { timePast } from '@/lib/utils';
import Link from 'next/link';
import FollowButton from './FollowButton';

const NotificationCard = ({ notification, sessionUser }) => {
  return (
    <Card className="flex items-center gap-3 border-0 p-0 py-3">
      <div className="p-2 rounded-full bg-accent/30">
        <Image
          src={
            notification?.type === "follow"
              ? "/assets/follow.svg"
              : notification?.type === "likePost"
              ? "/assets/like.svg"
              : "/assets/comment.svg"
          }
          alt={notification?.type}
          width={20}
          height={20}
        />
      </div>
      <div className="w-full flex items-center gap-3">
        <Link href={`/profile/${notification?.sender?._id}`}>
          <Image
            src={
              notification.sender.profileImage ||
              "/assets/profile-placeholder.svg"
            }
            alt={notification.sender.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <CardHeader className="p-0">
          {notification?.type === "follow" ? (
            <CardTitle className="text-sm">
              {notification?.sender.name.split(" ")[0]} followed you
            </CardTitle>
          ) : notification?.type === "likePost" ? (
            <CardTitle className="text-sm">
              {notification?.sender.name.split(" ")[0]} liked your post
            </CardTitle>
          ) : (
            <CardTitle className="text-sm">
              {notification?.sender.name.split(" ")[0]} commented on your post
            </CardTitle>
          )}
          <CardDescription className="text-xs">
            {timePast(notification?.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-0 ml-auto">
          {notification?.type === "follow" ? (
            <FollowButton
              userId={notification?.sender?._id}
              sessionUser={sessionUser}
              followed={notification?.sender?.followers?.includes(sessionUser?.id)}
            />
          ) : (
            <Link href={`/posts/${notification?.post?._id}`}>
              {notification?.post?.media[0]?.type === "image" ? (
                <Image
                  src={notification?.post?.media[0]?.url}
                  alt={notification?.post?.caption}
                  width={50}
                  height={50}
                  className="size-[50px] rounded object-cover"
                />
              ) : (
                <video muted className="size-[50px] object-cover rounded">
                  <source
                    src={notification?.post?.media[0]?.url}
                    type="video/mp4"
                  />
                </video>
              )}
            </Link>
          )}
          {/* <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="w-3 h-3 rounded-full bg-red-500" /> */}
        </CardFooter>
      </div>
    </Card>
  );
}

export default NotificationCard