'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLink = ({ link, className, isChat }) => {
  const pathname = usePathname();

  const isActive = (link) => {
    if (link === "/") return pathname === link;
    return pathname.startsWith(link);
  };

  const active = isActive(link.route);
  return (
    <Link
      href={link.route}
      className={`flex items-center group  gap-6 p-3 rounded-lg hover:text-white hover:bg-accent transition ${
        active && "bg-accent"
      } ${className}`}
    >
      <Image
        src={link.imageUrl}
        alt={link.label}
        className={` group-hover:invert group-hover:brightness-0 transition ${
          active && "invert brightness-0 transition"
        }${isChat && "size-6"}`}
        width={25}
        height={25}
      />
      <p className={`${active && "font-bold text-white"}`}>{link.label}</p>
    </Link>
  );
}

export default NavLink