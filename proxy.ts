import { NextRequest, NextResponse } from "next/server";

//? routes that genuinely need a signed-in user. /feed, /latest, /explore,
//? /sources and the article pages are deliberately absent: they fall back to
//? the public feed, which is what keeps the site readable without an account.
const protectedRoutes = ["/profile", "/saved", "/settings"];

//? better-auth keeps the session in a signed http-only cookie. we only need
//? to know a token *exists* here - the real validation happens in the server
//? actions that read the session, so a stale cookie costs one redirect, not a
//? broken page.
const hasSessionCookie = (request: NextRequest) =>
  Boolean(
    request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value,
  );

//? NOTE: this used to live in middleware.ts and also redirected `/auth/*` when
//? a session existed. that hijacked the OAuth return trip: better-auth finishes
//? the code exchange, sets the cookie, then redirects the browser to
//? /auth/callback - and the proxy bounced it straight to /feed, so the
//? callback page never ran its onboarding check. /auth is not matched at all
//? now, and the login page handles the "already signed in" case server-side.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/saved/:path*", "/settings/:path*"],
};
