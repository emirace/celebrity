import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req, { params }) {
  try {
    await connectDB();
    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const id = (await params).id;
    const user = await User.findById(id).populate("-password");
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user);
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
    const updated = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    await connectDB();

    const id = (await params).id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
