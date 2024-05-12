'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import MobileNav from './MobileNav'
import { Separator } from "@/components/ui/separator"
import { Avatar } from '@nextui-org/react'

const TopBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="fixed top-0 z-50 md:hidden w-full bg-background">
      <div className="flex justify-between items-center p-5">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/favicon.ico"
            alt="logo"
            height={25}
            width={25}
          />
          <h1 className="text-2xl font-bold">ChatWave</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/profile/${user?.id}`}>
            <Avatar
              src={
                user?.profileImage || "/assets/profile-placeholder.svg"
              }
              alt="profile"
              className='w-8 h-8'
            />
          </Link>
          <MobileNav />
        </div>
      </div>
      <Separator />
    </header>
  );
}

export default TopBar