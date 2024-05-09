import { useMessage } from '@/providers/MessageProvider'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

const NewMessagesCount = () => {
  const { chatRooms } = useMessage()
  const { data: session } = useSession()
  const sessionUserId = session?.user?.id

  const newChatRoomMessages = useMemo(() => {
    let count = 0
    if (chatRooms) {
      Object.values(chatRooms)?.map((room) => {
        const receivedMessages = room?.filter(
          (message) => message?.sender?._id?.toString() !== sessionUserId
        );
        if (receivedMessages?.find((message) => message?.isRead === false)) {
          count++;
        }
      });
    }
    return count
  }, [chatRooms])
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-destructive h-6 p-2 lg:p-4 ${
        newChatRoomMessages === 0 && "hidden"
      }`}
    >
      <p className="text-xs font-bold text-white">{newChatRoomMessages}</p>
    </div>
  );
}

export default NewMessagesCount