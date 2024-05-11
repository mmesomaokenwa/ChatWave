'use client'

import { bottombarLinks } from '@/constants';
import NavLink from './NavLink';
import { Tabs, Tab } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const BottomBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [selected, setSelected] = useState(() => returnBasePathname());

  function returnBasePathname() {
    if (pathname === "/") return "/"
    return pathname
  }

  const handleSelect = (value) => {
    if (value !== bottombarLinks[0].route) router.push(value)
    setSelected(value)
  }

  const isActive = (link) => {
    // if (link === "/") return pathname === link;
    // return pathname.startsWith(link);
    return selected === link;
  };
  
  return (
    <nav className="z-50 flex justify-between w-full fixed bottom-0 rounded-t-[20px] px-4 py-2 md:hidden">
      <Tabs
        selectedKey={selected}
        onSelectionChange={handleSelect}
        fullWidth
        color="secondary"
        aria-label="Bottom Bar"
        classNames={{
          tabList: "w-full",
          tab: "w-full h-fit hover:bg-accent",
          tabContent: "group-data-[selected=true]:font-semibold",
        }}
      >
        {bottombarLinks.map((link, index) => (
          <Tab
            key={link.route}
            className={`${index === 0 && "hidden"}`}
            title={
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center gap-1">
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
                <div></div>
              </div>
            }
          />
          // <NavLink
          //   key={index}
          //   link={link}
          //   className={"flex-col !gap-0 !py-0 text-sm"}
          //   isChat={link.label === "Chats"}
          // />
        ))}
      </Tabs>
    </nav>
  );
}

export default BottomBar