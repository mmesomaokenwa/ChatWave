'use client'

import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';

const ProfileForm = ({ user }) => {
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      profileImage: user?.profileImage || "",
    },
    mode: "onChange",
  })

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
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
          <Button type="button">Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm