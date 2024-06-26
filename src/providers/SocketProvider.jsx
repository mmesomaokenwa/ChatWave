'use client';

import { useToast } from "@/components/ui/use-toast";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useMessage } from "./MessageProvider";

const SocketContext = createContext({
  socket: null,
  onlineUsers: [''],
  isOnline: false,
  setOnlineUsers: () => { },
  setIsOnline: () => { },
  joinRoom: () => { },
  leaveRoom: () => { },
  connect: () => { },
  disconnect: () => { },
  on: () => { },
  emit: () => { }
});

const SocketProvider = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Connect to the server when the component mounts
  useEffect(() => {
    if (user?.id) { 
      const newSocket = io({
        query: {
          userId: user.id,
        },
        auth: {
          offset: undefined
        }
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to the server");
      });

      newSocket.on("online", (onlineUsers) => {
        console.log("online", onlineUsers);
        setOnlineUsers(onlineUsers);
      })

      newSocket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });

      return () => {
        // Disconnect from the server when the component unmounts
        newSocket.close();
        setSocket(null);
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [user]);

  const contextValue = {
    socket,
    onlineUsers,
    connect: (room) => socket?.emit("joinRoom", room),
    disconnect: () => socket?.disconnect(),
    on: (event, callback) => socket?.on(event, callback),
    emit: (event, data) => socket?.emit(event, data)
  };
  
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext);
}

export default SocketProvider