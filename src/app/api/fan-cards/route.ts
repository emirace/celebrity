import FanCard from "@/models/fanCard";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = auth(async function POST(req) {
  try {
    await connectDB();

    const { fandomTheme, photoUrl, nickname, celebrityId } = await req.json();

    const fanId = `FAN-${uuidv4().slice(0, 8)}`;
    const fanCard = await FanCard.create({
      fandomTheme,
      celebrityId,
      photoUrl,
      nickname,
      userId: req.user._id,
      fanId,
    });
    return NextResponse.json(fanCard, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});

export const GET = auth(async function GET(req) {
  try {
    await connectDB();
    const fanCards = await FanCard.find({ userId: req.user._id }).populate({
      path: "celebrityId",
      select: "username image fullName job",
    });
    return NextResponse.json(fanCards);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
