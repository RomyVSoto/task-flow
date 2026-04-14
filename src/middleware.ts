import NextAuth from "next-auth"
import { authConfigEdge } from "~/server/auth/auth.config"

const { auth } = NextAuth(authConfigEdge)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  const isAuthRoute = pathname.startsWith("/login") || 
                      pathname.startsWith("/register")
  const isLandingPage = pathname === "/"

  if (isLoggedIn && (isAuthRoute || isLandingPage)) {
    return Response.redirect(new URL("/dashboard", req.nextUrl))
  }

  if (!isLoggedIn && !isAuthRoute && !isLandingPage) {
    return Response.redirect(new URL("/", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}