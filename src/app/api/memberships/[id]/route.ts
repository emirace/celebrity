import Membership from "@/models/membership";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

// GET one membership
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const membership = await Membership.findById(params.id);
    if (!membership)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(membership);
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

// UPDATE a membership
export const PUT = auth(async function PUT(
  req,
  { params }: { params: { [id: string]: string } }
) {
  await connectDB();
  const body = await req.json();

  try {
    const updated = await Membership.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
});

// DELETE a membership
export const DELETE = auth(async function DELETE(
  _: NextRequest,
  { params }: { params: { [id: string]: string } }
) {
  await connectDB();
  try {
    const deleted = await Membership.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
});
