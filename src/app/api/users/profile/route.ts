import Booking from "@/models/booking";
import FanCard from "@/models/fanCard";
import Meet from "@/models/meet";
import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  await connectDB();
  const userId = request.user!._id;

  const user = await User.findById(userId)
    .select("-password")
    .populate("membership");

  const meetCount = await Meet.countDocuments({ userId });
  const fancardCount = await FanCard.countDocuments({ userId });
  const bookingsCount = await Booking.countDocuments({ userId });

  if (!user) {
    return new NextResponse("User not found", {
      status: 404,
    });
  }

  const responseData = {
    user,
    counts: {
      meet: meetCount,
      fancard: fancardCount,
      bookings: bookingsCount,
    },
  };

  return new NextResponse(JSON.stringify(responseData), {
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
