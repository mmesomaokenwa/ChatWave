"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import Image from "next/image";
import { updateUser } from "@/lib/mongodb/actions/user.actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import Loader from "./Loader";
import { useSession } from "next-auth/react";
import { Input, Textarea } from "@nextui-org/react";

const ProfileForm = ({ user }) => {
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [file, setFile] = useState(null);
  const [bioLength, setBioLength] = useState(240 - (user?.bio?.length || 0));

  const { toast } = useToast();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const { update } = useSession();

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      profileImage: user?.profileImage || "",
    },
    mode: "all",
  });

  const register = {
    name: form.register("name", {
      required: "Name is required",
    }),
    username: form.register("username", {
      required: "Username is required",
    }),
    email: form.register("email", {
      required: "Email is required",
      pattern: /^\S+@\S+$/i || "Please enter a valid email",
    }),
    bio: form.register("bio", {
      required: false,
      maxLength: { value: 240, message: "Bio should not be longer than 240 characters" },
      onChange: (e) => {
        setBioLength(240 - e.target.value.length);
      }
    }),
  };

  const onSubmit = async (data) => {
    try {
      if (file) {
        const uploadedFiles = await startUpload([file]);
        data.profileImage = uploadedFiles[0]?.url;
      }
      const updatedUser = await updateUser({
        user: {
          ...user,
          ...data,
        },
        path: `/profile/${user?._id}`,
      });

      if (!updatedUser) throw new Error("Something went wrong");

      form.reset();

      update({
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage,
          bio: updatedUser.bio,
        },
      });

      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
        variant: "success",
        duration: 2000,
        isClosable: true,
      });

      router.push(`/profile/${user?._id}`);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
    };
    input.click();
  };
  return (
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
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={selectImage}
          className="text-accent"
        >
          Change Profile Image
        </Button>
      </div>
      <Input
        label="Name"
        type={"text"}
        {...register.name}
        isInvalid={form.formState.errors.name}
        errorMessage={form.formState.errors.name?.message}
        color={form.formState.errors.name ? "danger" : "default"}
      />
      <Input
        label="Username"
        type={"text"}
        {...register.username}
        isInvalid={form.formState.errors?.username}
        errorMessage={form.formState.errors.username?.message}
        color={form.formState.errors.username ? "danger" : "default"}
      />
      <Input
        label="Email"
        type={"email"}
        {...register.email}
        isInvalid={form.formState.errors?.email}
        errorMessage={form.formState.errors?.email?.message}
        color={form.formState.errors.email ? "danger" : "default"}
      />
      <Textarea
        label="Bio"
        type={"text"}
        endContent={<span className="mt-auto text-sm">{bioLength}</span>}
        {...register.bio}
        isInvalid={form.formState.errors?.bio}
        errorMessage={form.formState.errors?.bio?.message}
        color={form.formState.errors.bio ? "danger" : "default"}
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
            <Loader className={"size-5 border-t-white/40 border-l-white/40"} />
          ) : (
            "Update Profile"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
