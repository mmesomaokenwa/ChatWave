"use client";

import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/mongodb/actions/user.actions";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { Check, X } from "lucide-react";
import { Input } from "@nextui-org/react";

export default function UserAuthForm({ className, mode }) {
  const router = useRouter();
  const { toast } = useToast();
  
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

  let register;

  if (mode === "signup") {
    register = {
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
      password: form.register("password", { required: "Password is required" }),
      confirmPassword: form.register("confirmPassword", {
        required: "Confirm Password is required",
        valueAsNumber: true, // the value will be sent to the server as a number
        validate: {
          isEqualToPassword: (value) =>
            value === form.watch("password") || "Passwords do not match",
        },
      }),
    }    
  } else if (mode === "login") {
    register = {
      email: form.register("email", {
        required: "Email is required",
        pattern: /^\S+@\S+$/i || "Please enter a valid email",
      }),
      password: form.register("password", { required: "Password is required" }),
    }
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

          if (signedInUser.error) {
            throw new Error(signedInUser.error);
          } else {
            toast({
              description: "Account created successfully",
              duration: 3000,
              icon: <Check />
            })
            router.push("/");
          }
        }
      } catch (error) {
        toast({
          // title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000,
          icon: <X />
        })
      }
    }

    if (mode === "login") {
      try {
        const signedInUser = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signedInUser.error) {
          throw new Error(signedInUser.error);
        } else {
          toast({
            description: "Logged in successfully",
            duration: 3000,
            icon: <Check />,
          });
          router.push("/");
        }
      } catch (error) {
        toast({
          // title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000,
          icon: <X />,
        });
      }
    }
  }

  return (
    <div className={cn("form grid place-items-stretch gap-4", className)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        {mode === "signup" && (
          <>
            <Input
              type={"text"}
              placeholder={"Name"}
              size="lg"
              startContent={<IoMdPerson className="w-6 h-6" />}
              {...register.name}
              isInvalid={form.formState.errors.name}
              errorMessage={form.formState.errors.name?.message}
              color={form.formState.errors.name ? "danger" : "default"}
            />
            <Input
              type={"text"}
              placeholder={"Username"}
              size="lg"
              startContent={<IoMdPerson className="w-6 h-6" />}
              {...register.username}
              isInvalid={form.formState.errors.username}
              errorMessage={form.formState.errors.username?.message}
              color={form.formState.errors.username ? "danger" : "default"}
            />
          </>
        )}
        <Input
          type={"email"}
          placeholder={"Email"}
          size="lg"
          startContent={<MdEmail className="w-6 h-6" />}
          {...register.email}
          isInvalid={form.formState.errors.email}
          errorMessage={form.formState.errors.email?.message}
          color={form.formState.errors.email ? "danger" : "default"}
        />
        <Input
          type={"password"}
          placeholder={"Password"}
          size="lg"
          startContent={<FaKey className="w-5 h-5" />}
          {...register.password}
          isInvalid={form.formState.errors.password}
          errorMessage={form.formState.errors.password?.message}
          color={form.formState.errors.password ? "danger" : "default"}
        />
        {mode === "signup" && (
          <Input
            type={"password"}
            placeholder={"Confirm Password"}
            size="lg"
            startContent={<FaKey className="w-5 h-5" />}
            {...register.confirmPassword}
            isInvalid={form.formState.errors.confirmPassword}
            errorMessage={form.formState.errors.confirmPassword?.message}
            color={form.formState.errors.confirmPassword ? "danger" : "default"}
          />
        )}
        <Button
          variant="accent"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {!form.formState.isSubmitting ? (
            mode === "signup" ? (
              "Sign Up"
            ) : mode === "login" ? (
              "Sign In"
            ) : null
          ) : (
            <Loader className={"size-5 border-t-white/40 border-l-white/40"} />
          )}
        </Button>
      </form>
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
