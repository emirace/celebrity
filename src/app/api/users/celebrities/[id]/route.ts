import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async function GET(
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
    const user = await User.findById(params.id).populate("-password");
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user);
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
    const updated = await User.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: { [key: string]: string } }
) {
  try {
    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    await connectDB();
    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
