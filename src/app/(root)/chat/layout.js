import ChatLayoutWrapper from '@/components/shared/ChatLayoutWrapper';
import authOptions from '@/lib/authOptions';
import { getAllMessagesByUserID } from '@/lib/mongodb/actions/chat.actions';
import { getServerSession } from 'next-auth';
import React from 'react'

const ChatLayout = async ({ children }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  const chatRooms = await getAllMessagesByUserID(sessionUser?.id)
  return <ChatLayoutWrapper chatRooms={chatRooms} chatRoom={children} />
}

export default ChatLayout