import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User, { UserDocument } from "../../../../../models/User";
import jwt from "jsonwebtoken";


const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Both email and password are required" },
        { status: 400 }
      );
    }

    // ✅ find user
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ✅ if you hashed passwords, compare
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    // if storing plain password (not recommended), just compare
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const userId = user._id.toString();

    // ✅ generate JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "7d" });

    // ✅ send response with cookie
    const response = NextResponse.json(
      { message: "Signin successful ✅", user: { id: userId, username: user.username, email } },
      { status: 200 }
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
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Something went wrong during signin", details: (error as Error).message },
      { status: 500 }
    );
  }
}
