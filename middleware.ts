import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/session`, {
      method: "POST",
      body: JSON.stringify({ cookie: req.cookies.get("loggedin")?.value }),
    });
    const res = await response.json();
    const next = NextResponse.next();

    if (req.nextUrl.pathname === "/admin" && res.login === "false") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (req.nextUrl.pathname === "/login" && res.login === "true") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return next;
    }
  } catch (e) {
    console.log(e);
  }
}
