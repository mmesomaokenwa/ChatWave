'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { commentPost } from '@/lib/mongodb/actions/post.actions';
import Loader from './Loader';
import { useSocket } from '@/providers/SocketProvider';

const CommentForm = ({ setComments, user, post, className }) => {
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  })

  const { emit } = useSocket()

  form.register('comment', {
    required: 'Comment is required',
    minLength: { value: 2, message: "Comment must be at least 1 character" },
  })

  const onSubmit = async (data) => {
    const { comment } = data
    try { 
      const { comment: commentData, notification } = await commentPost({
        comment,
        userId: user?.id,
        postId: post?._id,
        creatorId: post?.creator?._id,
        path: [
          `/posts/${post?._id}`,
          '/'
        ]
      })

      if (notification) emit('commentPost', {
        ...notification,
        sender: user,
        post
      })

      form.reset()
      setComments(prev => [...prev, commentData])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center w-full gap-2 ${className}`}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center">
                  <Image
                    src={user?.profileImage || "/assets/profile-placeholder.svg"}
                    alt="comment"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  <Input
                    placeholder="Write a comment..."
                    {...field}
                    className="w-full ring-0 ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" variant="ghost">
          {form.formState.isSubmitting ? (
            <Loader width={20} height={20} />
          ) : (
              <Image
                src="/assets/send.svg" alt="send"
                width={23}
                height={23}
                className={!form.formState.isDirty && 'invert brightness-50'}
              />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm