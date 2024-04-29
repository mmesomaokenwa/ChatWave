import { Poppins } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import SocketProvider from "@/providers/SocketProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import MessageProvider from "@/providers/MessageProvider";

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
        <AuthProvider>
          <SocketProvider>
            <MessageProvider>
            <ThemeProvider>
              <QueryProvider>
                {children}
                <Toaster />
              </QueryProvider>
              </ThemeProvider>
            </MessageProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
