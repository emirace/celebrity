import Booking from "@/models/booking";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, mobile, serviceType, celebrityId, datetime } =
      await req.json();
    const meet = await Booking.create({
      fullName,
      email,
      mobile,
      serviceType,
      celebrityId,
      datetime,
      userId: req.user._id,
    });
    return NextResponse.json(meet, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});

export const GET = auth(async function GET(req) {
  try {
    await connectDB();
    const meets = await Booking.find({ userId: req.user._id }).populate({
      path: "celebrityId",
      select: "username image fullName job",
    });
    return NextResponse.json(meets);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
