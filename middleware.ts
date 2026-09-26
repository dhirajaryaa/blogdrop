import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/saved", "/settings"];
const authRoutes = ["/auth/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // check if the route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // better-auth stores session token in cookies
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // redirect unauthenticated users away from protected routes
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    const feedUrl = new URL("/feed", request.url);
    return NextResponse.redirect(feedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/saved/:path*",
    "/settings/:path*",
    "/auth/:path*",
  ],
};
