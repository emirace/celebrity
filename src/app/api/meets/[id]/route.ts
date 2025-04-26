import Meet from "@/models/meet";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const meet = await Meet.findById(params.id).populate({
      path: "celebrityId",
      select: "image job fullName",
    });
    if (!meet)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
    return NextResponse.json(meet);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

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
    const updated = await Meet.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
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
    const deleted = await Meet.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ message: "Meet not found" }, { status: 404 });
    return NextResponse.json({ message: "Meet deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
