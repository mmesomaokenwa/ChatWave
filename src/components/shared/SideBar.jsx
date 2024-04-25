'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import LogoutButton from './LogoutButton'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const SideBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const isActive = (link) => {
    if (link === '/') return pathname === link;
    return pathname.startsWith(link);
  }
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
          {sidebarLinks?.map((link, index) => {
            const active = isActive(link.route);

            return (
              <Link
                key={index}
                href={link.route}
                className={`flex items-center group  gap-6 p-3 rounded-lg hover:text-white hover:bg-accent transition ${
                  active && "bg-accent"
                }`}
              >
                <Image
                  src={link.imageUrl}
                  alt={link.label}
                  className={` group-hover:invert group-hover:brightness-0 transition ${
                    active && "invert brightness-0 transition"
                  }`}
                  width={25}
                  height={25}
                />
                <p className={`${active && "font-bold text-white"}`}>
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </div>
      <LogoutButton showText={true} />
    </nav>
  );
}

export default SideBar