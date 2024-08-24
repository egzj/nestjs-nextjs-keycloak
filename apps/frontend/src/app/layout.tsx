import Nav from "@/components/nav"
import Providers from "@/utils/sessionProviderWrapper"
import { Inter } from "next/font/google"
import AuthStatus from "../components/authStatus"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My demo",
  description: "Some description for my website",
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-row">
            <div className="w-4/5 p-3 h-screen bg-black">{children}</div>
            <div className="w-1/5 p-3 h-screen bg-gray-700">
              <h2 className="text-3xl">Demo - frontend</h2>
              <AuthStatus />
              <hr />
              <Nav />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
