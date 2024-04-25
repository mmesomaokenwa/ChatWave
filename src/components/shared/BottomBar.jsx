'use client'

import { bottombarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const BottomBar = () => {
  const pathname = usePathname();

  const isActive = (link) => {
    if (link === '/') return pathname === link;
    return pathname.startsWith(link);
  }
  return (
    <nav className="z-50 flex justify-between w-full sticky bottom-0 rounded-t-[20px] bg-gray-100 dark:bg-slate-900 px-4 py-2 md:hidden">
      {bottombarLinks.map((link, index) => {
        const active = isActive(link.route);
        const isChat = link.label === "Chats";
        return (
          <Link
            key={index}
            href={link.route}
            className={`flex flex-col items-center group p-2 px-3 rounded-lg hover:text-white hover:bg-accent transition ${
              active && "bg-accent"
            }`}
          >
            <Image
              src={link.imageUrl}
              alt={link.label}
              className={`group-hover:invert group-hover:brightness-0 transition ${
                active && "invert brightness-0 transition"
              } ${isChat && "size-6"}`}
              width={25}
              height={25}
            />
            <p className={`text-sm ${active && "font-bold text-white"}`}>
              {link.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomBar