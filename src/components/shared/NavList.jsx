'use client'

import { cn } from '@/lib/utils';
import { Tab, Tabs } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import NewNoticationsCount from './NewNoticationsCount';
import NewMessagesCount from './NewMessagesCount';

const NavList = ({ links, classNames, isVertical, callback, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState(() => returnBasePathname());

  function returnBasePathname() {
    if (pathname === "/") return "/";
    return pathname;
  }

  const handleSelect = (value) => {
    if (value !== links[0].route) {
      if (callback) callback()
      router.push(value);
    }
    setSelected(value);
  };

  const isActive = (link) => {
    if (link === "/") return pathname === link;
    return pathname.startsWith(link);
    return selected === link;
  };

  return (
    <Tabs
      selectedKey={selected}
      onSelectionChange={handleSelect}
      fullWidth
      color="secondary"
      classNames={classNames}
      isVertical={isVertical}
      {...props}
    >
      {links.map((link, index) => (
        <Tab
          key={link.route}
          className={`${index === 0 && "hidden"}`}
          title={
            <Link
              href={link.route}
              className={cn(
                `relative flex w-full flex-col items-center justify-between gap-1 ${
                  isVertical && "flex-row gap-4"
                }`
              )}
            >
              <div
                className={cn(
                  `flex flex-col items-center gap-1 ${
                    isVertical && "flex-row gap-4"
                  }`
                )}
              >
                <Image
                  src={link.imageUrl}
                  alt={link.label}
                  width={25}
                  height={25}
                  className={`group-hover:invert group-hover:brightness-0 ${
                    isActive(link.route) && "invert brightness-0"
                  }`}
                />
                <p className="group-hover:text-white">{link.label}</p>
              </div>
              {link.label === "Notifications" && (   
                <NewNoticationsCount />        
              )}
              {link.label === "Chats" && (
                <NewMessagesCount />
              )}
            </Link>
          }
        />
      ))}
    </Tabs>
  );
}

export default NavList