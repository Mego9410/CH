import { NextResponse } from "next/server";

// Password wall temporarily disabled.
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

