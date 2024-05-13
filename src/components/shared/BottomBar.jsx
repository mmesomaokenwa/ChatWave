import { bottombarLinks } from '@/constants';
import NavList from './NavList';

const BottomBar = () => {
  return (
    <nav className="z-50 w-full rounded-t-[20px] px-4 py-1 md:hidden">
      <NavList
        links={bottombarLinks}
        aria-label="Bottom Bar"
        classNames={{
          tabList: "w-full",
          tab: "w-full h-fit hover:bg-accent",
          tabContent: "w-full group-data-[selected=true]:font-semibold",
        }}
      />
    </nav>
  );
}

export default BottomBar

// <NavLink
          //   key={index}
          //   link={link}
          //   className={"flex-col !gap-0 !py-0 text-sm"}
          //   isChat={link.label === "Chats"}
          // />