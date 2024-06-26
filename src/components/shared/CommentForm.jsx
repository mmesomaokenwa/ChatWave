'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { commentPost } from '@/lib/mongodb/actions/post.actions';
import Loader from './Loader';
import { useSocket } from '@/providers/SocketProvider';
import { Avatar, Input } from '@nextui-org/react';

const CommentForm = ({ setComments, user, post, className }) => {
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  })

  const { emit } = useSocket()

  const register = form.register('comment', {
    required: true,
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex items-center w-full ${className}`}
    >
      <Input
        placeholder="Write a comment..."
        size="lg"
        radius="full"
        startContent={
          <Avatar
            src={user?.profileImage || "/assets/profile-placeholder.svg"}
            alt="comment"
            size="sm"
            className="h-8 w-10 -ml-2"
          />
        }
        endContent={
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            className="rounded-full"
          >
            {form.formState.isSubmitting ? (
              <Loader className={"size-5"} />
            ) : (
              <Image
                src="/assets/send.svg"
                alt="send"
                width={23}
                height={23}
                className={!form.formState.isDirty && "invert brightness-50"}
              />
            )}
          </Button>
        }
        {...register}
        isInvalid={form.formState.errors.comment}
        color={form.formState.errors.comment ? "danger" : "default"}
        classNames={{
          input: "bg-transparent text-sm",
          inputWrapper:
            "bg-default-200/50 dark:bg-default/30 hover:bg-default-200/70 dark:hover:bg-default/50 group-data-[focus=true]:bg-default-200/70 dark:group-data-[focus=true]:bg-default/50",
          innerWrapper: "bg-transparent",
        }}
      />
    </form>
  );
};

export default CommentForm