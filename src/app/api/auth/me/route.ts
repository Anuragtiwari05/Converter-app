import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return NextResponse.json({ isLoggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
}
