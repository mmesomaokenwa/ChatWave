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
    <div className="flex items-center justify-between h-screen overflow-y-auto">
      <section className="grid place-content-center grow p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 mx-auto">
          <Image src="/assets/favicon.ico" alt="" height={40} width={40} />
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
      {/* <section className="hidden md:block w-1/2 h-screen">
        <Image
          src="https://mms.businesswire.com/media/20221205005060/en/1653636/5/ta2.jpg?download=1&_gl=1*1bbm1fx*_ga*MTAzNDM2Njc0MC4xNzA4MjkzNTY1*_ga_ZQWF70T3FK*MTcwODI5MzU2NC4xLjAuMTcwODI5MzU2NC42MC4wLjA."
          alt="logo"
          fill
          objectFit="cover"
          layout="fill"
          quality={50}
          className="w-full h-full object-cover"
        />
      </section> */}
    </div>
  );
}

export default SignIn