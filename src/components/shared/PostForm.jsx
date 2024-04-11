'use client'

import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CustomInput from './CustomInput';
import DropZone from './DropZone';
import { createPost, updatePost } from '@/lib/mongodb/actions/post.actions';
import { useUploadThing } from '@/lib/uploadthing';
import { useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const PostForm = ({ post, action }) => {
  const form = useForm({
    defaultValues: {
      caption: post?.caption || "",
      media: post?.media || [],
      tags: post?.tags?.join(", ") || "",
      location: post?.location || "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user
  const { startUpload } = useUploadThing("imageUploader");

  form.register('media', {
    required: 'You need to upload at least one image or video',
  })

  form.register('caption', {
    required: false,
    validate: (value) => value.length <= 300 || "Caption must be less than 300 characters",
  })

  const onSubmit = async (data) => {
    if (action === 'create') { 
      try {
        const uploadedFiles = await startUpload(data.media);

        if (!uploadedFiles || uploadedFiles.length < data.media) return;

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <CustomInput field={field} label="Caption" isTextArea />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos or Videos</FormLabel>
              <FormControl>
                <DropZone
                  setValue={form.setValue}
                  valueName="media"
                  post={post}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <CustomInput type={'text'} field={field} label="Location" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                type={'text'}
                field={field}
                label="Add Tags (separated by comma ' , ')"
              />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-4'>
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button type="submit" variant="accent"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? 'Submitting'
              : action === 'create'
                ? 'Create Post'
                : 'Update Post'
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm