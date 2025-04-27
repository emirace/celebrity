import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/database";

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { username, email, password } = body;

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify("Registration successful"), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
