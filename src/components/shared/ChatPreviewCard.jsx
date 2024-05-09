import React, { useMemo } from 'react'
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
import { useMessage } from '@/providers/MessageProvider';
import IsTyping from './IsTyping';
import { useSocket } from '@/providers/SocketProvider';

const ChatPreviewCard = ({ chat, roomId }) => {
  const { typingUsers } = useMessage()
  const { onlineUsers } = useSocket()
  const isTyping = useMemo(() => typingUsers?.includes(roomId), [typingUsers, roomId])
  const isOnline = useMemo(() => onlineUsers?.includes(roomId), [onlineUsers, roomId])

  const shortenText = (text) => {
    if (text.length > 20) {
      return text.slice(0, 20) + "...";
    }
  } 
  return (
    <Link href={`/chat/${roomId}`}>
      <Card className="w-full flex items-center gap-3 p-0 py-4 cursor-pointer border-0">
        <div className="rounded-full relative">
          <Image
            src={
              chat.isOwned
                ? chat.receiver?.profileImage ||
                  "/assets/profile-placeholder.svg"
                : chat.sender?.profileImage || "/assets/profile-placeholder.svg"
            }
            alt="Profile Image"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          {isOnline && (
            <div className="absolute top-0 right-1 w-3 h-3 rounded-full bg-green-500" />
          )}
        </div>
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
            {isTyping ? (
              <IsTyping />
            ) : (
              <>
                <div className="text-sm truncate">
                  {chat.isOwned
                    ? `You: ${shortenText(chat?.message)}`
                    : `${shortenText(chat?.message)}`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatChatDate(chat.createdAt)}
                </div>
              </>
            )}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default ChatPreviewCard