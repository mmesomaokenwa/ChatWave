'use client'

import { useMessage } from '@/providers/MessageProvider';
import { useSocket } from '@/providers/SocketProvider';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react'

const ChatRoomInfo = ({ chatRoom }) => {
  const { onlineUsers } = useSocket()
  const { typingUsers } = useMessage()
  const isOnline = useMemo(() => onlineUsers?.includes(chatRoom._id), [onlineUsers, chatRoom._id])
  const isTyping = useMemo(() => typingUsers?.includes(chatRoom._id), [typingUsers, chatRoom._id])

  const showOnline = isOnline && !isTyping
  const showTyping = isOnline && isTyping
  return (
    <div className="sticky top-0 md:top-0 max-w-5xl w-full flex items-center justify-between gap-3 py-3 bg-background border-b z-10">
      <Link
        href={`/profile/${chatRoom._id}`}
        className="flex items-center gap-3"
      >
        <Image
          src={chatRoom.profileImage || "/assets/profile-placeholder.svg"}
          alt={chatRoom.name}
          className="size-8 md:size-10 rounded-full"
          width={45}
          height={45}
        />
        <div className="flex flex-col">
          <h2 className="text-lg md:text-2xl font-medium">{chatRoom.name}</h2>
          <p className="text-xs text-muted-foreground">
            {showOnline ? "Online" : showTyping ? "Typing..." : "Offline"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ChatRoomInfo