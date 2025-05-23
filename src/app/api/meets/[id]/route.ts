import Meet from "@/models/meet";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const id = (await params).id;
    const meet = await Meet.findById(id).populate({
      path: "celebrityId",
      select: "image job fullName meetFee",
    });
    if (!meet)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
    return NextResponse.json(meet);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

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
    const updated = await Meet.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
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
    const deleted = await Meet.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
    return NextResponse.json({ message: "Meet deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
