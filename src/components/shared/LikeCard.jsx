import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { Card, CardFooter, CardHeader, User } from '@nextui-org/react';

const LikeCard = async ({ like }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)

  return (
    <Card className="w-full py-2 overflow-visible">
      <CardHeader className="flex items-center justify-between w-full">
        <Link href={`/profile/${like?._id}`}>
          <User
            avatarProps={{
              src: like?.profileImage || "/assets/profile-placeholder.svg",
              size: "md",
            }}
            name={like?.name}
            description={`@${like?.username}`}
          />
        </Link>
        {like?._id !== sessionUser?.id && (
          <FollowButton
            userId={like?._id}
            sessionUser={sessionUser}
            followed={like?.followers?.includes(sessionUser?.id)}
          />
        )}
      </CardHeader>
    </Card>
  );
}

export default LikeCard