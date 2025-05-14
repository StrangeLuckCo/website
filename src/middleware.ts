import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests to /welcome and static assets (e.g. _next, images, fonts, etc.)
  const isAllowedPath =
    pathname === "/welcome" ||
    pathname === "/thank-you" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(.*)$/); // exclude all file extensions (e.g. .png, .css)

  if (!isAllowedPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
