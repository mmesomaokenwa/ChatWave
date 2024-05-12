import React from 'react'
import { formatText, timePastShort } from '@/lib/utils';
import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader, User } from '@nextui-org/react';

const CommentCard = ({ comment }) => {
  const formattedText = formatText(comment?.comment);
  return (
    <Card className="overflow-visible">
      <Link href={`/profile/${comment?.user?._id}`}>
        <CardHeader className="flex-row items-start gap-4 p-4 space-y-0">
          <User
            avatarProps={{
              src:
                comment?.user?.profileImage ||
                "/assets/profile-placeholder.svg",
              size: "md",
            }}
            name={comment?.user?.name}
            description={
              <>
                <span>@{comment?.user?.username}</span>
                <span className="text-muted-foreground mx-1">&#x2022;</span>
                <span>{timePastShort(comment?.createdAt)}</span>
              </>
            }
            classNames={{
              description: "text-sm",
              wrapper: "flex flex-row gap-2",
              base: "items-start gap-3"
            }}
          />
        </CardHeader>
      </Link>
      <CardBody className="-mt-10 overflow-visible">
        <div className="text-sm lg:text-[16px] ml-14">{formattedText}</div>
      </CardBody>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export default CommentCard