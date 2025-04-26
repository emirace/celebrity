import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  await connectDB();
  const user = await User.findById(request.user!._id).select("-password");

  if (!user) {
    return new NextResponse("User not found", {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

export const PUT = auth(async function PUT(req) {
  try {
    await connectDB();

    const { fullName, image, username, password } = await req.json();
    const data: {
      fullName: string;
      image: string;
      username: string;
      password?: string;
    } = {
      fullName,
      image,
      username,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
