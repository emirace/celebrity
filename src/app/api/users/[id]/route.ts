import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
