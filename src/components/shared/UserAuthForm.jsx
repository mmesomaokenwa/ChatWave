"use client";

import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import CustomInput from "./CustomInput";

export default function UserAuthForm({ className, mode }) {
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: 'all'
  });

  const registers = [
    form.register("name", { required: true }),
    form.register("username"),
    form.register("email", { required: true, pattern: /^\S+@\S+$/i }),
    form.register("password", { required: true }),
    form.register("confirmPassword", {
      valueAsNumber: true, // the value will be sent to the server as a number
      validate: {
        isEqualToPassword: (value) =>
          value === form.watch("password") || "Passwords do not match",
      },
    }),
  ]

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className={cn("form grid place-items-stretch gap-4", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          {mode === "signup" && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <CustomInput
                    field={field}
                    type={"text"}
                    placeholder={"Name"}
                    label={<IoMdPerson className="w-6 h-6" />}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <CustomInput
                    field={field}
                    type={"text"}
                    placeholder={"Username"}
                    label={<IoMdPerson className="w-6 h-6" />}
                  />
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <CustomInput
                field={field}
                type={"email"}
                placeholder={"Email"}
                label={<MdEmail className="w-6 h-6" />}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <CustomInput
                field={field}
                type={"password"}
                placeholder={"Password"}
                label={<FaKey className="w-5 h-5" />}
              />
            )}
          />
          {mode === "signup" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <CustomInput
                  field={field}
                  type={"password"}
                  placeholder={"Confirm Password"}
                  label={<FaKey className="w-5 h-5" />}
                />
              )}
            />
          )}
          <Button
            variant="accent"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
