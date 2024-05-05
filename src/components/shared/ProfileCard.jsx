import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import ViewFollowers from './ViewFollowers';
import ViewFollowing from './ViewFollowing';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import FollowButton from './FollowButton';

const ProfileCard = ({ user, sessionUser }) => {
  return (
    <Card className="w-full flex flex-col lg:flex-row lg:items-start gap-4 p-0 border-0">
      <Image
        src={user?.profileImage || "/assets/profile-placeholder.svg"}
        alt={user?.username}
        width={80}
        height={80}
        className="rounded-full lg:size-40"
      />
      <div className="w-full flex flex-col gap-4 relative">
        <CardHeader className="flex-row items-center justify-between p-0">
          <div>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>@{user?.username}</CardDescription>
          </div>
          <div className="flex gap-3 absolute lg:relative right-0 -top-20 lg:top-0">
            {user?._id === sessionUser?.id ? (
              <Link
                href={"/edit-profile"}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Image
                  src={"/assets/edit.svg"}
                  alt="edit profile"
                  width={20}
                  height={20}
                  className="mr-2 invert brightness-50"
                />
                Edit Profile
              </Link>
            ) : (
              <>
                <FollowButton
                  userId={user?._id}
                  sessionUser={sessionUser}
                  followed={user?.followers?.find(follower => follower?._id === sessionUser?.id) ? true : false}
                />
                <Link
                  href={`/chat/${user?._id}`}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  {/* <Image
                    src={"/assets/chat.svg"}
                    alt="message"
                    width={20}
                    height={20}
                    className="mr-2"
                  /> */}
                  Message
                </Link>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex gap-4">
            <p className="flex flex-col font-medium">
              <span className="text-accent">{user?.posts?.length}</span>
              <span>Posts</span>
            </p>
            <ViewFollowers
              followers={user?.followers}
              isCurrentUser={user?._id === sessionUser?.id}
            />
            <ViewFollowing
              following={user?.following}
              isCurrentUser={user?._id === sessionUser?.id}
            />
          </div>
          <p className="text-sm">{user?.bio}</p>
        </CardContent>
        <CardFooter className="p-0"></CardFooter>
      </div>
    </Card>
  );
}

export default ProfileCard