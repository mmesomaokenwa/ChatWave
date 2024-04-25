'use client'

import React, { useState } from 'react'
import ChatBubble from './ChatBubble';
import MessageForm from './MessageForm';

const Messages = ({ chatRoom, roomId, sessionUser }) => {
  const [messages, setMessages] = useState([]);
  return (
    <>
      <div
        id="messages"
        className="flex flex-col-reverse gap-2 w-full grow overflow-y-scroll"
      >
        {chatRoom &&
          chatRoom.map((message, index) => {
            const isLastMessage = index === 0;
            return (
              <ChatBubble
                key={message._id}
                message={message}
                isLastMessage={isLastMessage}
                isOwned={message.isOwned}
              />
            );
          })}
      </div>
      <div className="sticky bottom-20 md:bottom-0 w-full">
        <MessageForm
          roomId={roomId}
          senderId={sessionUser?.id}
          receiverId={
            chatRoom[0]?.isOwned
              ? chatRoom[0]?.receiver?._id
              : chatRoom[0]?.sender?._id
          }
        />
      </div>
    </>
  );
}

export default Messages