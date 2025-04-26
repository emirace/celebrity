import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  await connectDB();
  if (request.user.role !== "Admin") {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const users = await User.find({ role: { $ne: "Celebrity" } }).select(
    "-password"
  );

  return new NextResponse(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

export const PUT = auth(async function PUT(req) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      username,
      image,
      mobile,
      nationality,
      dob,
      gender,
      age,
    } = await req.json();
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        email,
        username,
        image,
        mobile,
        nationality,
        dob,
        gender,
        age,
      },
      {
        new: true,
      }
    ).select("-password");
    if (!updated)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
