import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const next = NextResponse.next();
  const logined = req.cookies.get("loggedin");

  if (req.nextUrl.pathname === "/admin" && (!logined || logined.value === "false")) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (req.nextUrl.pathname === "/login" && logined?.value === 'true') {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return next;
  }
}
