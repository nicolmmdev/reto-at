import type { ReactNode } from "react"
import Providers from "@/components/providers"
import Header from "@/components/layout/Header"
import "./globals.css"
import { Rubik } from "next/font/google"
import NavbarWrapper from "@/components/layout/NavbarWrapper"

const rubik = Rubik({
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: "BetDay Lite",
    template: "%s | BetDay Lite"
  },
  description: "Plataforma de apuestas deportivas BetDay Lite",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className={rubik.className}>

        <Providers>

          <NavbarWrapper />

          {children}

        </Providers>

      </body>
    </html>
  )
}