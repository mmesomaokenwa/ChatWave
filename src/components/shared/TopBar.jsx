'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { useSession } from 'next-auth/react'
import MobileNav from './MobileNav'

const TopBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="sticky top-0 z-50 md:hidden bg-gray-200 dark:bg-slate-800 w-full">
      <div className="flex justify-between items-center py-4 px-5">
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
          <LogoutButton />
          <Link href="/profile">
            <Image
              className="size-8 rounded-full"
              src={
                user?.profileImage || "/assets/profile-placeholder.svg"
              }
              alt="profile"
              height={32}
              width={32}
            />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default TopBar