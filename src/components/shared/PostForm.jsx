'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import DropZone from './DropZone';
import { createPost, updatePost } from '@/lib/mongodb/actions/post.actions';
import { useUploadThing } from '@/lib/uploadthing';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { Input, Textarea } from '@nextui-org/react';
import { Label } from '../ui/label';

const PostForm = ({ post, action }) => {
  const form = useForm({
    defaultValues: {
      caption: post?.caption || "",
      media: post?.media || [],
      tags: post?.tags?.join(", ") || "",
      location: post?.location || "",
    },
    mode: "all",
  });

  const [captionLength, setCaptionLength] = useState(300 - (post?.caption?.length || 0));
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user
  const { startUpload } = useUploadThing("imageUploader");

  const register = {
    caption: form.register("caption", {
      required: false,
      maxLength: {
        value: 300,
        message: "Caption must be less than 300 characters",
      },
      onChange: (e) => {
        setCaptionLength(300 - e.target.value.length);
      }
    }),
    media: form.register("media", {
      required: "You need to upload at least one image or video",
    }),
    tags: form.register("tags", {
      required: false,
    }),
    location: form.register("location", {
      required: false,
    }),
  };

  const onSubmit = async (data) => {
    if (action === 'create') { 
      try {
        const uploadedFiles = await startUpload(data.media);

        if (!uploadedFiles) return;

        const post = {
          ...data,
          media: uploadedFiles.map((file) => ({
            url: file.url,
            type: file.type.includes("image") ? "image" : "video",
          })),
          tags: data.tags.split(",").map((tag) => tag.trim()),
        };
        const createdPost = await createPost({
          post,
          creatorId: user?.id,
          path: '/'
        });

        if (!createdPost) throw new Error

        form.reset()

        toast({
          title: "Post created successfully",
          description: "We've created your post for you.",
          duration: 3000,
        })
        
        router.push("/");
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: typeof error === "string" ? error : error.message,
          duration: 3000,
          status: "error",
          variant: "destructive",
        })
      }
    }
    
    if (action === 'update') {
      try {
        const isSameMedia = !form.formState.dirtyFields?.media

        let postMedia;

        if (!isSameMedia) {
          const uploadedFiles = await startUpload(data.media);
          
          if (!uploadedFiles || uploadedFiles.length < data.media) return;

          postMedia = uploadedFiles.map((file) => ({
            url: file.url,
            type: file.type.includes("image") ? "image" : "video",
          }));
        } else {
          postMedia = post.media
        }

        const newPost = {
          ...post,
          media: postMedia,
          tags: data.tags.split(",").map((tag) => tag.trim()),
          caption: data.caption,
          location: data.location,
        }
        const updatedPost = await updatePost({
          post: newPost,
          userId: user?.id,
          path: ['/', `/posts/${post._id}`],
        });

        if (!updatedPost) throw new Error

        form.reset()
        
        toast({
          title: "Post updated successfully",
          description: "We've updated your post for you.",
          duration: 3000,
        })
        
        router.push(`/posts/${updatedPost._id}`)
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: typeof error === "string" ? error : error.message,
          duration: 3000,
          status: "error",
          variant: "destructive",
        })
      }
     }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-9 w-full max-w-5xl"
    >
      <Textarea
        label="Caption"
        endContent={<p className="mt-auto text-sm">{captionLength}</p>}
        {...register.caption}
        isInvalid={form.formState.errors.caption}
        errorMessage={form.formState.errors.caption?.message}
        color={form.formState.errors.caption ? "danger" : "default"}
        classNames={{
          input: "bg-transparent",
          inputWrapper:
            "dark:bg-default/40 dark:group-data-[invalid=true]:bg-danger/20 dark:hover:bg-default/50 dark:focus-within:bg-default/50 dark:group-data-[invalid=true]:hover:bg-danger/30",
          innerWrapper: "bg-transparent",
        }}
      />
      <div>
        <Label className={form.formState.errors.media && "text-red-500"}>
          Add Photos or Videos
        </Label>
        <DropZone
          setValue={form.setValue}
          valueName="media"
          post={post}
          error={form.formState.errors.media}
        />
        {form.formState.errors.media && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.media.message}
          </p>
        )}
      </div>
      <Input
        type={"text"}
        label="Location"
        {...register.location}
        classNames={{
          input: "bg-transparent",
          inputWrapper:
            "dark:bg-default/40 dark:hover:bg-default/50 dark:group-data-[focus=true]:bg-default/50",
          innerWrapper: "bg-transparent",
        }}
      />
      <Input
        type={"text"}
        label="Add Tags (separated by comma ' , ')"
        {...register.tags}
        classNames={{
          input: "bg-transparent",
          inputWrapper:
            "dark:bg-default/40 dark:hover:bg-default/50 dark:group-data-[focus=true]:bg-default/50",
          innerWrapper: "bg-transparent",
        }}
      />
      <div className="flex justify-end gap-4">
        <Button type="button" variant="destructive">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="accent"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className={"size-5 border-t-white/40 border-l-white/40"} />
          ) : action === "create" ? (
            "Create Post"
          ) : (
            "Update Post"
          )}
        </Button>
      </div>
    </form>
  );
}

export default PostForm