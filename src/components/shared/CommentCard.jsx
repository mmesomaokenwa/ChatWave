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
import { timePastShort } from '@/lib/utils';
import Link from 'next/link';

const CommentCard = ({ comment }) => {
  return (
    <Card className="border-0">
      <Link href={`/profile/${comment?.user?._id}`}>
        <CardHeader className="flex-row items-start gap-4 p-4 space-y-0">
          <Image
            src={
              comment?.user?.profileImage || "/assets/profile-placeholder.svg"
            }
            alt={comment?.user?.username}
            width={40}
            height={40}
          />
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm lg:text-[16px]">
              {comment?.user?.name}
            </CardTitle>
            <CardDescription className="text-sm">
              @{comment?.user?.username}
            </CardDescription>
            <span className="text-muted-foreground">&#x2022;</span>
            <CardDescription className="text-sm">
              {timePastShort(comment?.createdAt)}
            </CardDescription>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="-mt-6">
        <p className="text-sm lg:text-[16px] ml-12">{comment?.comment}</p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export default CommentCard