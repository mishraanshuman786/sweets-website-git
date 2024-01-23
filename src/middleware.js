import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie ? tokenCookie.value : "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin).toString(), request.nextUrl);
  }

  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};
