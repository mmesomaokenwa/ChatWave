import { useMessage } from '@/providers/MessageProvider'
import { Chip } from '@nextui-org/react'
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
    <Chip
      color="danger"
      classNames={{
        base: `absolute md:relative right-0 ${
          newChatRoomMessages === 0 && "hidden"
        }`,
        content: "text-xs font-bold text-white",
      }}
    >
      {newChatRoomMessages}
    </Chip>
  );
}

export default NewMessagesCount