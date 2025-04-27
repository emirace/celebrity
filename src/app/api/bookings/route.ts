import Booking from "@/models/booking";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  try {
    await connectDB();

    const { name, email, phone, service, celebrityId, date, time, category } =
      await req.json();

    const datetime = new Date(`${date}T${time}`);

    const meet = await Booking.create({
      fullName: name,
      email,
      mobile: phone,
      serviceType: service,
      category,
      celebrityId,
      datetime,
      userId: req.user._id,
    });
    return NextResponse.json(meet, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
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
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
