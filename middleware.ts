import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {

    console.log("Middleware ejecutado:", req.nextUrl.pathname)

    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url))
    }

  },
  {
    pages: {
      signIn: "/login"
    }
  }
)

export const config = {
  matcher: [
    "/profile",
    "/bets/:path*",
    "/login"
  ]
}