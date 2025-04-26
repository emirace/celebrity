import Membership from "@/models/membership";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

// GET all memberships
export async function GET() {
  await connectDB();
  const memberships = await Membership.find().sort({ price: 1 });
  return NextResponse.json(memberships);
}

// CREATE a new membership
export const POST = auth(async function POST(req) {
  if (req.user.role !== "Admin") {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  await connectDB();
  const body = await req.json();
  const { name, image, price } = body;

  if (!name || !image || !price)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const newMembership = await Membership.create({ name, image, price });
  return NextResponse.json(newMembership, { status: 201 });
});
