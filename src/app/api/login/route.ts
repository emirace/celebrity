import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/database";

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(`Email and password are required`, {
      status: 400,
    });
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 500 }
    );
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return new Response(JSON.stringify(token), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
