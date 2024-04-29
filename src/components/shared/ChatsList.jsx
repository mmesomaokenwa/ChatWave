'use client'

import React, { useEffect } from 'react'
import ChatPreviewCard from './ChatPreviewCard';
import { useMessage } from '@/providers/MessageProvider';

const ChatsList = ({ chatRooms }) => {
  const { chatRooms: rooms, setChatRooms } = useMessage()

  useEffect(() => {
    if (chatRooms) {
      setChatRooms(chatRooms)
    }
  }, [chatRooms]);
  return (
    <div className="w-full h-full">
      {Object.keys(rooms)?.length > 0 ? (
        Object.entries(rooms)?.map(([key, chat]) => (
        <ChatPreviewCard key={key} chat={chat[0]} roomId={key} />
      ))
      ) : (
        <div className="w-full text-center mt-4 font-medium">No Chats Found</div>
      )}
    </div>
  );
}

export default ChatsList