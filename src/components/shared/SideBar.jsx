'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import LogoutButton from './LogoutButton'
import { useSession } from 'next-auth/react'
import NavLink from './NavLink'

const SideBar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-gray-100 dark:bg-slate-900">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/favicon.ico" alt="Logo" height={35} width={35} />
          <h1 className="text-3xl font-bold">ChatWave</h1>
        </Link>
        <Link href={`/profile/${user?.id}`} className="flex items-center gap-3">
          <Image
            className="size-14 rounded-full"
            src={user?.profileImage || "/assets/profile-placeholder.svg"}
            alt="profile"
            height={56}
            width={56}
          />
          <div className="flex flex-col">
            <p className="text-dark dark:text-light text-xl font-bold">
              {user?.name}
            </p>
            <p className="text-dark-2 dark:text-gray">@{user?.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks?.map((link, index) => (
            <NavLink key={index} link={link} />
          ))}
        </ul>
      </div>
      <LogoutButton className="flex justify-start gap-3" />
    </nav>
  );
}

export default SideBar