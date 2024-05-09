'use client'

import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider';
import { useSession } from 'next-auth/react';
import { revalidate } from '@/lib';
import { getAllMessagesByUserID } from '@/lib/mongodb/actions/chat.actions';

const MessageContext = createContext({
  chatRoomMessages: [{}],
  chatRooms: {},
  typingUsers: [''],
  setTypingUsers: () => { },
  setChatRooms: () => { },
  setChatRoomMessages: () => { },
})

const MessageProvider = ({ children }) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState({});
  const [chatRoomMessages, setChatRoomMessages] = useState([]); 

  const { toast } = useToast();
  const pathname = usePathname()
  const router = useRouter();
  const { socket, on } = useSocket()
  const { data: session } = useSession()
  const sessionUser = session?.user

  useEffect(() => {
    let timeout;
    if (socket) { 
      on("typing", (data) => {
        console.log("typing", data);
        setTypingUsers((prev) => {
          if (prev.includes(data.senderId)) {
            return prev;
          } else {
            return [...prev, data.senderId];
          }
        });

        clearTimeout(timeout);

        timeout = setTimeout(() => {
          setTypingUsers((prev) => prev.filter((id) => id !== data.senderId));
        }, 4000)
      });

      on("message", (data) => {
        const roomId = data.sender._id?.toString()
        setChatRooms((prev) => {
          if (prev[roomId]) { 
            return { ...prev, [roomId]: [data, ...prev[roomId]] };
          } else {
            return { ...prev, [roomId]: [data] };
          }
        });

        if (pathname === `/chat/${roomId}`) {
          setChatRoomMessages((prev) => [data, ...prev]);
        }

        setTypingUsers((prev) => prev.filter((id) => id !== roomId));

        revalidate(`/chat/${roomId}`)
  
        toast({
          title: `Message from ${data.sender.username}`,
          description: data.message,
          image: data.sender.profileImage || "/assets/profile-placeholder.svg",
          duration: 5000,
          onClick: () => {
            router.push(`/chat/${roomId}`);
          },
        });
      });

      return () => {
        socket.off("message");
        socket.off("typing");
        clearInterval(timeout);
      }
    }
  }, [socket])

  useEffect(() => {
    if (sessionUser?.id) {
      getAllMessagesByUserID(sessionUser?.id).then((data) => setChatRooms(data))
    }
  }, [sessionUser?.id])
  
  const contextValue = {
    chatRoomMessages,
    chatRooms,
    typingUsers,
    setTypingUsers,
    setChatRooms,
    setChatRoomMessages,
  }
  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

export const useMessage = () => {
  return useContext(MessageContext)
}