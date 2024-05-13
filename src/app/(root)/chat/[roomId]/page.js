import ChatRoomInfo from '@/components/shared/ChatRoomInfo'
import Messages from '@/components/shared/Messages'
import authOptions from '@/lib/authOptions'
import { getMessagesByRoomId, markAllMessagesRead } from '@/lib/mongodb/actions/chat.actions'
import { getServerSession } from 'next-auth'
import React from 'react'

const ChatRoom = async ({ params: { roomId } }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  const [chatRoom, isRead] = await Promise.all([
    getMessagesByRoomId({ roomId, userId: sessionUser?.id }),
    markAllMessagesRead({
      roomId,
      userId: sessionUser?.id,
    }),
  ]);

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center px-5 md:px-8 lg:p-14">
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
          isRead={isRead}
        />
      </div>
    </div>
  );
}

export default ChatRoom