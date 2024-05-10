import { Poppins } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import SocketProvider from "@/providers/SocketProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import MessageProvider from "@/providers/MessageProvider";
import NotificationsProvider from "@/providers/NotificationsProvider";
import UIProvider from "@/providers/UIProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Chat Wave",
  description: "A social networking app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <UIProvider>
          <AuthProvider>
            <SocketProvider>
              <MessageProvider>
                <NotificationsProvider>
                  <ThemeProvider>
                    <QueryProvider>
                      {children}
                      <Toaster />
                    </QueryProvider>
                  </ThemeProvider>
                </NotificationsProvider>
              </MessageProvider>
            </SocketProvider>
          </AuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}
