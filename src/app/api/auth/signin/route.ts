import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check password (later: use bcrypt.compare)
    if (existingUser.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    // ✅ Set cookie
    const response = NextResponse.json(
      {
        message: "Signin successful",
        user: {
          username: existingUser.username,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Something went wrong during signin" },
      { status: 500 }
    );
  }
}
