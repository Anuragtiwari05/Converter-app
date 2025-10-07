import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ✅ Narrow JWT_SECRET inside function
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Allow auth pages without redirect
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // If no token → redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    // ✅ Now TypeScript knows JWT_SECRET is string
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
