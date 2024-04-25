import Messages from '@/components/shared/Messages'
import authOptions from '@/lib/authOptions'
import { getMessagesByRoomId } from '@/lib/mongodb/actions/chat.actions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const ChatRoom = async ({ params: { roomId } }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  const chatRoom = await getMessagesByRoomId({ roomId, userId: sessionUser?.id })
  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col flex-1 items-center py-2 px-5 md:px-8 lg:p-14">
        <div className="sticky top-20 md:top-0 max-w-5xl w-full flex items-center justify-start gap-3 py-2 bg-light dark:bg-dark border-b  border-light-2 dark:border-light-dark z-10">
          <Image
            src={chatRoom[0]?.isOwned
              ? chatRoom[0]?.receiver?.profileimage || "/assets/profile-placeholder.svg"
              : chatRoom[0]?.sender?.profileimage || "/assets/profile-placeholder.svg"
            }
            alt={chatRoom[0]?.isOwned ? chatRoom[0]?.receiver?.name : chatRoom[0]?.sender?.name}
            className="size-8 md:size-10 rounded-full"
            width={45}
            height={45}
          />
          <h2 className="text-lg md:text-2xl font-medium">{chatRoom[0]?.isOwned ? chatRoom[0]?.receiver?.name : chatRoom[0]?.sender?.name}</h2>
        </div>
        <Messages chatRoom={chatRoom} roomId={roomId} sessionUser={sessionUser} />
      </div>
    </div>
  );
}

export default ChatRoom