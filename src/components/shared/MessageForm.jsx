'use client'

import React from 'react'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid'
import { createMessage } from '@/lib/mongodb/actions/chat.actions';
import { useSocket } from '@/providers/SocketProvider';

const MessageForm = ({ roomId, senderId, receiverId }) => {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  })

  const { emit } = useSocket()

  const onSubmit = async (data) => {
    try {
      const { message } = data;
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        roomId: roomId || uuidv4(),
        message,
      }

      const sentMessage = await createMessage({
        req: messageData,
        path: ['/chat', `/chat/${roomId}`]
      })

      if (!sentMessage) throw new Error('Could not send message')

      emit('message', sentMessage)
    } catch (error) {
      
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex bg-white dark:bg-black rounded-lg shadow-md overflow-hidden">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full flex gap-2 items-center">
              <FormControl>
                <Input
                  placeholder="Type a message" {...field}
                  className="w-full py-3 px-4 border-none text-black dark:text-white rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="ghost" className='bg-yellow-500 hover:bg-yellow-500/90'
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
      </form>
    </Form>
  );
}

export default MessageForm