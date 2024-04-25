'use client'

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ChatsList from './ChatsList';

const ChatLayoutWrapper = ({ chatRooms, chatRoom }) => {
  const pathname = usePathname();
  const isActive = pathname === "/chat";
  const chatIdRegex = /\/chat\/(\d+)/;
  const isChatVisble = pathname.match(chatIdRegex);

  const [width, setWidth] = useState(0);
  const isNotLaptop = width < 1024;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main className="flex flex-1">
      <div
        className={`flex flex-col flex-1 items-center gap-8 overflow-y-scroll py-8 px-5 md:px-8 lg:p-14 w-full lg:w-[200px] custom-scrollbar ${
          isNotLaptop && !isActive && "hidden"
        }`}
      >
        <div className="w-full flex items-center gap-3">
          <Image
            src="/assets/chat.svg"
            alt="chats"
            height={36}
            width={36}
            className="invert brightness-200 dark:brightness-0"
          />
          <h2 className="text-3xl md:text-2xl font-bold">All Chats</h2>
        </div>
        <ChatsList chatRooms={chatRooms} />
      </div>
      <div
      className={`flex grow h-full ${
        !isChatVisble && isNotLaptop && "hidden"
      }`}
      >
        {chatRoom}
      </div>
    </main>
  );
}

export default ChatLayoutWrapper