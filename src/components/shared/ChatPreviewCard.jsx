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
import { formatChatDate } from '@/lib/utils';

const ChatPreviewCard = ({ chat }) => {
  return (
    <Link href={`/chat/${chat.roomId}`}>
      <Card className="w-full flex items-center gap-3 p-0 py-4 cursor-pointer border-0">
        <Image
          src={
            chat.isOwned
              ? chat.receiver?.profileimage || "/assets/profile-placeholder.svg"
              : chat.sender?.profileimage || "/assets/profile-placeholder.svg"
          }
          alt="Profile Image"
          width={45}
          height={45}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="w-full space-y-2">
          <CardHeader className="gap-2 flex-row items-center space-y-0 p-0">
            <CardTitle className="text-sm">
              {chat.isOwned ? chat.receiver?.name : chat.sender?.name}
            </CardTitle>
            <CardDescription className="">
              @{chat.isOwned ? chat.receiver?.username : chat.sender?.username}
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-2 flex items-center justify-between p-0">
            <p className="text-sm line-clamp-1 ">
              {chat.isOwned ? `You: ${chat?.message}` : `${chat?.message}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatChatDate(chat.createdAt)}
            </p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default ChatPreviewCard