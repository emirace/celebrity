import FanCard from "@/models/fanCard";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(
  _,
  { params }: { params: { [key: string]: string } }
) {
  try {
    await connectDB();
    const meet = await FanCard.findById(params.id).populate({
      path: "celebrityId",
      select: "username image fullName job fanCardFee",
    });
    if (!meet)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json(meet);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});

export const PUT = auth(async function PUT(
  req,
  { params }: { params: { [key: string]: string } }
) {
  try {
    await connectDB();

    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const data = await req.json();
    const updated = await FanCard.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: { [key: string]: string } }
) {
  try {
    await connectDB();
    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const deleted = await FanCard.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json({ message: "FanCard deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
