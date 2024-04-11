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
import { useSocket } from "@/providers/SocketProvider";
import { createUser } from "@/lib/mongodb/actions/user.actions";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserAuthForm({ className, mode }) {
  const { connect: socketConnect } = useSocket();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  
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

  let registers;

  if (mode === "signup") {
    registers = [
      [
        form.register("name", {
          required: "Name is required",
        }),
        form.register("username", {
          required: "Username is required",
        }),
        form.register("email", {
          required: "Email is required",
          pattern: /^\S+@\S+$/i || "Please enter a valid email",
        }),
        form.register("password", { required: "Password is required" }),
        form.register("confirmPassword", {
          required: "Confirm Password is required",
          valueAsNumber: true, // the value will be sent to the server as a number
          validate: {
            isEqualToPassword: (value) =>
              value === form.watch("password") || "Passwords do not match",
          },
        }),
      ],
    ];
  } else if (mode === "login") {
    registers = [
      [
        form.register("email", {
          required: "Email is required",
          pattern: /^\S+@\S+$/i || "Please enter a valid email",
        }),
        form.register("password", { required: "Password is required" }),
      ],
    ];
  }

  async function onSubmit(data) {
    if (mode === "signup") { 
      try {
        const createdUser = await createUser(data);

        if (createdUser) {
          const signedInUser = await signIn("credentials", {
            email: createdUser.email,
            password: data.password,
            redirect: false,
          });

          console.log(signedInUser)

          if (signedInUser.error) {
            throw new Error(signedInUser.error);
          } else {
            socketConnect(createdUser.username);
            toast({
              title: "Success",
              description: "Account created successfully",
              variant: "success",
              status: "success",
              duration: 3000,
            })
            router.push("/");
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          status: "error",
          duration: 3000
        })
      }
    }

    if (mode === "login") {
      console.log(data)
      try {
        const signedInUser = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signedInUser.error) {
          throw new Error(signedInUser.error);
        } else {
          console.log(session)
          socketConnect(session?.user?.username);
          router.push("/");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          status: "error",
          duration: 3000,
        })
      }
    }
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
                    error={form.formState.errors.name}
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
                    error={form.formState.errors.username}
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
                error={form.formState.errors.email}
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
                error={form.formState.errors.password}
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
                  error={form.formState.errors.confirmPassword}
                />
              )}
            />
          )}
          <Button
            variant="accent"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {mode === "signup"
              ? "Sign Up"
              : mode === "login" && "Sign In"}
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
