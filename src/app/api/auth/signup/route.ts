import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User, { UserDocument } from "../../../../../models/User";
import jwt from "jsonwebtoken";

// ✅ force JWT_SECRET to always be a string
const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields (username, email, password) are required" },
        { status: 400 }
      );
    }

    // ✅ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // ✅ create user with correct typing
    const newUser: UserDocument = await User.create({ username, email, password });

    // ✅ safely convert _id
    const userId = newUser._id.toString();

    // ✅ generate JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ response with cookie
    const response = NextResponse.json(
      {
        message: "Signup successful ✅",
        user: { id: userId, username, email },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong during signup",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
