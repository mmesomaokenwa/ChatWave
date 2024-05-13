'use client'

import { useMessage } from '@/providers/MessageProvider';
import { useSocket } from '@/providers/SocketProvider';
import { User } from '@nextui-org/react';
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
        <User
          avatarProps={{
            src: chatRoom.profileImage || "/assets/profile-placeholder.svg",
            size: "md"
          }}
          name={chatRoom.name}
          description={showOnline ? "Online" : showTyping ? "Typing..." : "Offline"}
          classNames={{
            name: "md:text-2xl font-medium",
          }}
        />
      </Link>
    </div>
  );
}

export default ChatRoomInfo