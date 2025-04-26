import Payment from "@/models/payment";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  try {
    await connectDB();

    const userId = req.user._id;
    console.log(userId);
    const payments = await Payment.find({ userId });

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user payments", error },
      { status: 500 }
    );
  }
});
