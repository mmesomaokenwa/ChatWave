'use client';

import { useToast } from "@/components/ui/use-toast";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

const SocketContext = createContext({
  socket: null,
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

  const { toast } = useToast();

  // Connect to the server when the component mounts
  useEffect(() => {
    if (user?.id) { 
      const newSocket = io({
        query: {
          username: user?.username,
        },
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        // toast({
        //   title: "Connected",
        //   description: "You are now connected to the server",
        //   variant: "success",
        //   duration: 2000
        // })
        console.log("Connected to the server");
      });

      newSocket.on("online", (onlineUsers) => {
        console.log("online", onlineUsers);
        setOnlineUsers(onlineUsers);
      })

      newSocket.on("disconnect", () => {
        // toast({
        //   title: "Disconnected",
        //   description: "You have been disconnected from the server",
        //   variant: "destructive",
        //   duration: 2000
        // })
        console.log("Disconnected from the server");
      });

      newSocket.on("message", ({ sender, message }) => {
        console.log("receiveMessage", { sender, message });
        toast({
          title: `Message from ${sender.username}`,
          description: message,
          variant: "info",
          duration: 5000,
          // onClick: () => newSocket.emit("stopTyping", { sender, roomId: sender.roomId }),
        });
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