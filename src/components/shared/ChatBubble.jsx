import { formatChatDate } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import OptionsPopup from './OptionsPopup';

const ChatBubble = ({ message, isLastMessage, isOwned, className }) => {
  return (
    <div
      className={`flex flex-col my-2 ${
        isOwned ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          isOwned ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Image
          src={message.sender.profileImage || "/assets/profile-placeholder.svg"}
          alt={message.sender.name}
          className="size-8 md:size-10 rounded-full self-start"
          width={45}
          height={45}
        />
        <div
          className={`px-4 py-2 max-w-sm ${
            isOwned
              ? "bg-accent text-white rounded-l-xl rounded-tr-xl"
              : "dark:bg-gray-800 bg-gray-200 rounded-r-xl rounded-tl-xl"
          }`}
        >
          <p>{message.message}</p>
        </div>
        <OptionsPopup message={message} />
      </div>
      {isLastMessage && (
        <div className={`text-sm text-muted-foreground ${isOwned ? "text-right" : "text-left"}`}>{formatChatDate(message.createdAt)}</div>
      )}
    </div>
  );
}

export default ChatBubble