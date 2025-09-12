import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Credential missing" },
        { status: 400 }
      );
    }

    // ✅ Corrected: use User not username
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // ✅ Save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" } // user stays logged in for 7 days
    );

    // ✅ Set JWT in HttpOnly cookie
    const response = NextResponse.json(
      { message: "Signup successful", user: { username, email } },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
     console.error("Signup error:", error); // This will print the exact Mongoose error
  return NextResponse.json(
    { error: "Something went wrong during signup", details: (error as Error).message },
    { status: 500 }
    );
  }
}
