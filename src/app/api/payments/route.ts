import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import connectDB from "@/utils/database";
import Payment from "@/models/payment";
import { auth } from "@/utils/auth";

export const GET = auth(async function GET(request) {
  await connectDB();

  if (request.user.role !== "Admin") {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  try {
    const payments = await Payment.find().populate("userId");

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { message: "Error fetching payments", error },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { amount, currency, receipt, type, paymentMethod, meta } = body;

    if (!amount || !type || !meta || !currency || !paymentMethod) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = req.user._id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transactionId = uuidv4();

      const payment = await Payment.create(
        [
          {
            userId,
            amount,
            currency,
            paymentMethod,
            transactionId,
            receipt,
            type,
            meta,
            status: "pending",
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(payment[0], { status: 201 });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Transaction failed:", error);
      return NextResponse.json(
        { message: "Error processing payment", error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
});
