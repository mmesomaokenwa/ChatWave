import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

const LikeCard = async ({ like }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)

  return (
    <Card className="flex items-center justify-between border-0">
      <CardHeader className="p-4">
        <Link
          href={`/profile/${like?._id}`}
          className="flex items-center gap-4"
        >
          <Image
            src={like?.profileImage || "/assets/profile-placeholder.svg"}
            alt={like?.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <CardTitle className="font-bold text-sm lg:text-[16px]">
              {like?.name}
            </CardTitle>
            <CardDescription className="text-xs">@{like?.username}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <CardFooter className="p-4">
        {like?._id !== sessionUser?.id && <FollowButton userId={like?._id} sessionUser={sessionUser} followed={like?.followers?.includes(sessionUser?.id)} />}
      </CardFooter>
    </Card>
  );
}

export default LikeCard