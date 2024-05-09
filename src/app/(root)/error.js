'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HomeError = ({ error, reset }) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 py-24 px-5 md:px-8 lg:p-14">
      <h2 className="text-xl font-bold">{error.message}</h2>
      <p className="text-center">
        Something went wrong. Please try again later.
      </p>
      <div className="space-x-4">
        <Link
          href={'/'}
          className={buttonVariants({
            variant: "outline"
          })}
        >
          Go Home
        </Link>
        <Button variant="accent" onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}

export default HomeError