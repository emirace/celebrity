import Membership from "@/models/membership";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

// GET one membership
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const id = (await params).id;
    const membership = await Membership.findById(id);
    if (!membership)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(membership);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

// UPDATE a membership
export const PUT = auth(async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();

  try {
    const id = (await params).id;
    const updated = await Membership.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
});

// DELETE a membership
export const DELETE = auth(async function DELETE(_: NextRequest, { params }) {
  await connectDB();
  try {
    const id = (await params).id;
    const deleted = await Membership.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
});
