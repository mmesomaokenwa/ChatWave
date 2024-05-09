import { formatChatDate, formatText } from '@/lib/utils';
import Image from 'next/image';
import React, { forwardRef, useMemo } from 'react'
import OptionsPopup from './OptionsPopup';

const ChatBubble = forwardRef(({ message, isLastMessage, isOwned, className }, ref) => {
  const formattedMessage = useMemo(() => formatText(message.message), [message.message])
  return (
    <div
      ref={ref}
      className={`flex flex-col my-2 ${
        isOwned ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          isOwned ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* <Image
          src={message.sender.profileImage || "/assets/profile-placeholder.svg"}
          alt={message.sender.name}
          className="size-8 md:size-10 rounded-full self-start"
          width={45}
          height={45}
        /> */}
        <div
          className={`px-4 py-2 max-w-[200px] ${
            isOwned
              ? "bg-accent text-white rounded-l-xl rounded-tr-xl"
              : "dark:bg-gray-800 bg-gray-200 rounded-r-xl rounded-tl-xl"
          }`}
        >
          <div className="flex flex-col break-words">
            {formattedMessage}
          </div>
        </div>
        <OptionsPopup message={message} isOwned={isOwned} />
      </div>
      {isLastMessage && (
        <div
          className={`text-sm text-muted-foreground ${
            isOwned ? "text-right" : "text-left"
          }`}
        >
          {message.isSending ? "Sending..." : formatChatDate(message.createdAt)}
        </div>
      )}
    </div>
  );
})

export default ChatBubble