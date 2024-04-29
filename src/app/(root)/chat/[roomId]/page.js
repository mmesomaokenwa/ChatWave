import ChatRoomInfo from '@/components/shared/ChatRoomInfo'
import Messages from '@/components/shared/Messages'
import authOptions from '@/lib/authOptions'
import { getMessagesByRoomId } from '@/lib/mongodb/actions/chat.actions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ChatRoom = async ({ params: { roomId } }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  const chatRoom = await getMessagesByRoomId({ roomId, userId: sessionUser?.id })
  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col flex-1 items-center py-2 px-5 md:px-8 lg:p-14">
        <ChatRoomInfo
          chatRoom={
            chatRoom[0]?.isOwned
              ? chatRoom[0]?.receiver
              : chatRoom[0]?.sender
          }
        />
        <Messages
          chatRoom={chatRoom}
          roomId={roomId}
          sessionUser={sessionUser}
        />
      </div>
    </div>
  );
}

export default ChatRoom