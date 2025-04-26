import Meet from "@/models/meet";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = auth(async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // Input validation
    if (
      !data.firstName ||
      !data.lastName ||
      !data.celebrityId ||
      !data.reason ||
      !data.occupation ||
      !data.gender ||
      !data.state ||
      !data.city ||
      !data.address ||
      !data.passport ||
      !data.duration
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }
    const meetId = `MEET-${uuidv4().slice(0, 8)}`;

    const meet = await Meet.create({
      firstName: data.firstName,
      lastName: data.lastName,
      celebrityId: data.celebrityId,
      reason: data.reason,
      occupation: data.occupation,
      gender: data.gender,
      state: data.state,
      city: data.city,
      address: data.address,
      duration: data.duration,
      userId: req.user._id,
      meetId,
      passport: data.passport,
    });
    return NextResponse.json(meet, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});

export const GET = auth(async function GET(req) {
  try {
    await connectDB();
    const meets = await Meet.find({ userId: req.user._id }).populate({
      path: "celebrityId",
      select: "username image fullName job",
    });
    return NextResponse.json(meets);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
