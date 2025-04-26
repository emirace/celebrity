import FanCard from "@/models/fanCard";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(_, { params }) {
  try {
    await connectDB();

    const id = (await params).id;
    const meet = await FanCard.findById(id).populate({
      path: "celebrityId",
      select: "username image fullName job fanCardFee",
    });
    if (!meet)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json(meet);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});

export const PUT = auth(async function PUT(req, { params }) {
  try {
    await connectDB();

    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const data = await req.json();

    const id = (await params).id;
    const updated = await FanCard.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    await connectDB();
    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const id = (await params).id;
    const deleted = await FanCard.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { message: "FanCard not found" },
        { status: 404 }
      );
    return NextResponse.json({ message: "FanCard deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
