import UserAuthForm from '@/components/shared/UserAuthForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: "Sign Up | ChatWave",
  description: "Sign Up | ChatWave",
};

const SignUp = () => {
  return (
    <section className="grid place-content-center grow p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8 mx-auto">
        <Image src="/assets/favicon.ico" alt="Logo" height={40} width={40} />
        <p className="text-3xl font-bold">ChatWave</p>
      </div>
      <div className="grid gap-3">
        <h1 className="text-2xl font-bold text-center">
          Create a new account
        </h1>
        <p className="text-sm text-gray-400 text-center">
          To continue, you need to create a new account
        </p>
        <UserAuthForm mode={"signup"} />
      </div>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "link" }), "text-accent")}
        >
          Login
        </Link>
      </p>
    </section>
  );
}

export default SignUp