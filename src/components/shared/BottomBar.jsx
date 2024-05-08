'use client'

import { bottombarLinks } from '@/constants';
import NavLink from './NavLink';

const BottomBar = () => {
  return (
    <nav className="z-50 flex justify-between w-full sticky bottom-0 rounded-t-[20px] bg-gray-100 dark:bg-light-dark px-4 py-2 md:hidden">
      {bottombarLinks.map((link, index) => (
        <NavLink
          key={index}
          link={link}
          className={"flex-col !gap-0 !py-2"}
          isChat={link.label === "Chats"}
        />
      ))}
    </nav>
  );
}

export default BottomBar