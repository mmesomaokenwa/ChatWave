'use client'

import React from 'react'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { createMessage } from '@/lib/mongodb/actions/chat.actions';
import { useSocket } from '@/providers/SocketProvider';
import { useMessage } from '@/providers/MessageProvider';
import { Textarea } from '@nextui-org/react';

const MessageForm = ({ roomId, sender }) => {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  })

  const { emit } = useSocket()
  const { setChatRoomMessages } = useMessage()

  const onSubmit = async (data) => {
    try {
      const { message } = data;
      if (!message || !message.trim()) return
  
      const messageData = {
        sender: sender?.id,
        receiver: roomId,
        message,
      }

      const optimisticMessage = {
        sender: {
          _id: sender?.id,
          ...sender,
        },
        receiver: {
          _id: roomId
        },
        message,
        isOwned: true,
        isSending: true,
      }

      form.reset()

      setChatRoomMessages((prev) => [optimisticMessage, ...prev]);

      const sentMessage = await createMessage({
        req: messageData,
        path: ['/chat', `/chat/${roomId}`]
      })

      if (!sentMessage) throw new Error('Could not send message')

      emit('message', sentMessage)
    } catch (error) {
      console.log({ error })
    }
  }

  const handleKeyPress = () => {
    emit("typing", {
      senderId: sender?.id,
      receiverId: roomId,
      isTyping: true,
    });
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex bg-white dark:bg-black py-2 rounded-lg shadow-md overflow-hidden"
    >
      <Textarea
        placeholder="Type a message..."
        minRows={1}
        maxRows={3}
        onKeyPress={handleKeyPress}
        endContent={
          <Button
            type="submit"
            variant="ghost"
            className="bg-yellow-500 hover:bg-yellow-500/90"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            <Image
              src="/assets/send.svg"
              alt="send"
              width={20}
              height={20}
              className="invert brightness-200"
            />
          </Button>
        }
        {...form.register("message")}
      />
    </form>
  );
}

export default MessageForm