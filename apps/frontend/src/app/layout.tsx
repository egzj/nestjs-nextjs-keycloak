import Nav from "@/components/nav"
import Providers from "@/utils/sessionProviderWrapper"
import { Inter } from "next/font/google"
import AuthStatus from "../components/authStatus"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata = {
  title: "My demo",
  description: "Some description for my website",
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex flex-row">
            <div className="w-4/5 p-3 h-screen ">{children}</div>
            <div className="w-1/5 p-3 h-screen bg-gray-400">
              <h2 className="text-3xl">Demo - frontend</h2>
              <AuthStatus />
              <hr />
              <Nav />
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
