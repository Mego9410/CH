import { NextResponse } from "next/server";

const AUTH_COOKIE = "ch_auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  res.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}

