'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChatBubble from './ChatBubble';
import MessageForm from './MessageForm';
import { useMessage } from '@/providers/MessageProvider';
import IsTyping from './IsTyping';

const Messages = ({ chatRoom, roomId, sessionUser, isRead }) => {
  const { chatRoomMessages, setChatRoomMessages, setChatRooms, typingUsers } = useMessage();
  const isTyping = useMemo(() => typingUsers.includes(roomId), [typingUsers, roomId])

  const lastMessageRef = useRef(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    if (chatRoom) {
      setChatRoomMessages(chatRoom);
      setIsScrolledToBottom(true);

      if (isRead) {
        setChatRooms(prev => {
          const newRoom = prev[roomId]?.map((message) => ({
            ...message,
            isRead: true,
          }));
          return { ...prev, [roomId]: newRoom };
        })
      }
    }
  }, [chatRoom]);

  useEffect(() => {
    if (isScrolledToBottom) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatRoomMessages])
  return (
    <>
      <div className="flex flex-col-reverse w-full grow overflow-y-scroll">
        {isTyping && <IsTyping size="lg" />}
        {chatRoomMessages &&
          chatRoomMessages.map((message, index) => {
            const isLastMessage = index === 0;
            return (
              <ChatBubble
                key={message?._id}
                message={message}
                isLastMessage={isLastMessage}
                isOwned={message?.isOwned}
                ref={isLastMessage ? lastMessageRef : null}
              />
            );
          })}
      </div>
      <div className="sticky bottom-0 w-full">
        <MessageForm roomId={roomId} sender={sessionUser} />
      </div>
    </>
  );
}

export default Messages