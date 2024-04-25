import React from 'react'
import ChatPreviewCard from './ChatPreviewCard';

const ChatsList = ({ chatRooms }) => {
  return (
    <div className="w-full h-full">
      {Object.keys(chatRooms)?.length > 0 ? (
        Object.entries(chatRooms)?.map(([key, chat]) => (
        <ChatPreviewCard key={key} chat={chat[chat.length - 1]} />
      ))
      ) : (
        <div className="w-full text-center mt-4 font-medium">No Chats Found</div>
      )}
    </div>
  );
}

export default ChatsList