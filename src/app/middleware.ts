import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // allow auth pages without redirect
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // if no token → redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // protect all routes except API & assets
};
