'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import DarkModeToggler from './DarkModeToggler';
import { Button } from '../ui/button';
import LogoutButton from './LogoutButton';
import NavLink from './NavLink';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const mobileNav = [
  {
    label: 'Notifications',
    imageUrl: '/assets/notifications.svg',
    route: '/notifications'
  },
  {
    label: 'Settings',
    imageUrl: '/assets/settings.svg',
    route: '/settings'
  },
]

const MobileNav = () => {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <HiMiniBars3BottomRight className="text-3xl" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Image
              src={user?.profileImage || "/assets/profile-placeholder.svg"}
              alt="profile"
              height={56}
              width={56}
              className="rounded-full mx-auto mt-4"
            />
            <SheetTitle>{user?.name}</SheetTitle>
            <SheetDescription className="!-mt-1">
              @{user?.username}
            </SheetDescription>
            <SheetDescription className="!mt-4 line-clamp-2">
              {user?.bio}
            </SheetDescription>
            <SheetDescription className="flex justify-between gap-4 mt-4">
              <Link
                href={`/profile/${user?.id}?showFollowers=true`}
                className="flex items-center gap-2 text-black dark:text-white"
              >
                <span className="text-accent font-semibold">
                  {user?.followers?.length}
                </span>{" "}
                Followers
              </Link>
              <Link
                href={`/profile/${user?.id}?showFollowing=true`}
                className="flex items-center gap-2 text-black dark:text-white"
              >
                <span className="text-accent font-semibold">
                  {user?.following?.length}
                </span>{" "}
                Following
              </Link>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-between gap-4 mt-4">
            {mobileNav.map((link, index) => (
              <NavLink key={index} link={link} className={"!gap-2"} />
            ))}
            <DarkModeToggler />
            <LogoutButton className="flex gap-3" variant="destructive" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav