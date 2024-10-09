import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request);

  if (
    request.nextUrl.pathname === "/auth" ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/login"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (request.nextUrl.pathname === "/app") {
    return NextResponse.redirect(new URL("/app/home", request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/auth/:path*",
};
