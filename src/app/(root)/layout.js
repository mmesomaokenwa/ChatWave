import BottomBar from "@/components/shared/BottomBar";
import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";

const RootLayout = ({ children }) => {
  return (
    <div className="w-full h-screen md:flex overflow-y-auto">
      <TopBar />
      <SideBar />
      <main className="flex flex-1 h-full">
        {children}
      </main>
      <BottomBar />
    </div>
  );
}

export default RootLayout