import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from 'next-auth/react';
import FollowButton from './FollowButton';
import Image from 'next/image';
import Link from 'next/link';

const UserPreviewCard = ({ user }) => {
  const { data: session } = useSession()
  const sessionUser = session?.user
  return (
    <Card className="flex flex-col items-center justify-between p-4 border-0">
      <Link
        href={`/profile/${user?._id}`}
        className="flex flex-col items-center justify-between"
      >
        <Image
          src={user?.profileImage || "/assets/profile-placeholder.svg"}
          alt={user?.username}
          width={80}
          height={80}
          className="rounded-full"
        />
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-lg lg:text-xl truncate">
            {user?.name}
          </CardTitle>
          <CardDescription>@{user?.username}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="p-0">
        {user?._id !== sessionUser?.id ? (
          <FollowButton
            userId={user?._id}
            sessionUser={sessionUser}
            followed={user?.followers.includes(sessionUser?.id)}
          />
        ) : (
          <p>You</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default UserPreviewCard