'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';
import Image from 'next/image';
import { updateUser } from '@/lib/mongodb/actions/user.actions';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import Loader from './Loader';
import { signIn, useSession } from 'next-auth/react';

const ProfileForm = ({ user }) => {
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [file, setFile] = useState(null);

  const { toast } = useToast()
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const { update, data: session } = useSession();
  console.log(session)

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      profileImage: user?.profileImage || "",
    },
    mode: "all",
  })

  const onSubmit = async (data) => {
    try {
      if (file) {
        const uploadedFiles = await startUpload([file]);
        data.profileImage = uploadedFiles[0]?.url
      }
      const updatedUser = await updateUser({
        user: {
          ...user,
          ...data,
        },
        path: `/profile/${user?._id}`,
      });

      if (!updatedUser) throw new Error("Something went wrong");

      form.reset()

      update({
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage,
          bio: updatedUser.bio
      }})

      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
        variant: "success",
        duration: 2000,
        isClosable: true,
      })

      router.push(`/profile/${user?._id}`)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const selectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.setValue("profileImage", URL.createObjectURL(file), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setFile(file);
        setProfileImage(URL.createObjectURL(file));
      }
    }
    input.click();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <div className="flex items-center gap-2">
          <Image
            src={profileImage || "/assets/profile-placeholder.svg"}
            alt={user?.name}
            className="size-20 rounded-full"
            width={48}
            height={48}
          />
          <Button type="button" variant="ghost" size="sm" onClick={selectImage}>
            Change Profile Image
          </Button>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                field={field}
                label="Name"
                type={"text"}
                error={form.errors?.name}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                field={field}
                label="Username"
                type={"text"}
                error={form.errors?.username}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                field={field}
                label="Email"
                type={"email"}
                error={form.errors?.email}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                field={field}
                label="Bio"
                isTextArea
                error={form.errors?.bio}
              />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end gap-2">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="accent"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? (
              <Loader
                className={"size-5 border-t-white/40 border-l-white/40"}
              />
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm