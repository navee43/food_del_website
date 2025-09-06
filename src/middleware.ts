import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl;

  // console.log("cookies:", request.cookies.getAll());
  // console.log("token: is this   ", token);

  // If logged in, block auth pages
  if (
    token &&
    (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify")
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  

  if (
    !token &&
    (
     url.pathname.startsWith("/profile") ||
     url.pathname.startsWith("/orders")  ||
     url.pathname.startsWith("/cart")    ||
     url.pathname.startsWith("/menuitems")  
    )
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/verify/:path*",
    "/aboutus",
    "/contactus",
    "/menu",
    "/orders",
    "/cart",
    "/profile",
    "/menuitems/:path*",
  ],
};
