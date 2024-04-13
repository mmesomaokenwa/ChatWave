'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const CommentForm = ({ setComments, profileImage, userId, postId, className }) => {
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  })

  form.register('comment', {
    required: 'Comment is required',
    minLength: { value: 2, message: "Comment must be at least 1 character" },
  })

  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center w-full gap-2 ${className}`}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center">
                  <Image src={profileImage || "/assets/profile-placeholder.svg"} alt="comment" width={35} height={35} />
                  <Input placeholder="Write a comment..." {...field} className='w-full ring-0 ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" variant="ghost">
          <Image src="/assets/send.svg" alt="send" width={23} height={23} />
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm