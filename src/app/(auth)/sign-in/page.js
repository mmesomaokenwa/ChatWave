import Image from "next/image";
import Link from "next/link";

import UserAuthForm from "@/components/shared/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Sign In | ChatWave",
  description: "Sign In | ChatWave",
};

const SignIn = () => {
  return (
    <section className="grid place-content-center grow p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8 mx-auto">
        <Image src="/assets/favicon.ico" alt="Logo" height={40} width={40} />
        <p className="text-3xl font-bold">ChatWave</p>
      </div>
      <div className="grid gap-3">
        <h1 className="text-2xl font-bold text-center">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-400 text-center">
          To continue, you need to sign in to your account
        </p>
        <UserAuthForm mode={"login"} />
      </div>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className={cn(buttonVariants({ variant: "link" }), "text-accent")}
        >
          Sign Up
        </Link>
      </p>
    </section>
  );
}

export default SignIn