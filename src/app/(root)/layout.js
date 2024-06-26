import BottomBar from "@/components/shared/BottomBar";
import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full h-[100svh] flex flex-col md:flex-row relative">
      <TopBar />
      <SideBar />
      <main className="flex flex-1 h-[calc(100svh_-_10rem)] md:h-full">
        {children}
      </main>
      <BottomBar />
    </div>
  );
}

export default RootLayout