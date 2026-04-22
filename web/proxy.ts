import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "ch_auth";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Allow login/logout endpoints (and Next.js internals via matcher).
  if (pathname === "/login" || pathname.startsWith("/api/login") || pathname.startsWith("/api/logout")) {
    return NextResponse.next();
  }

  const authed = req.cookies.get(AUTH_COOKIE)?.value === "1";
  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

