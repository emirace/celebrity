import Booking from "@/models/booking";
import Meet from "@/models/meet";
import Membership from "@/models/membership";
import Payment from "@/models/payment";
import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req: Request, { params }) {
  await connectDB();

  const id = (await params).id;
  try {
    const payment = await Payment.findById(id).populate("userId");

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { message: "Error fetching payment", error },
      { status: 500 }
    );
  }
});

export const PUT = auth(async function PUT(req: Request, { params }) {
  await connectDB();

  const id = (await params).id;
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { message: "Payment status is required" },
        { status: 400 }
      );
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("userId");

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }

    if (payment.type === "meet") {
      const meetId = payment.meta._id;

      if (!meetId) {
        return NextResponse.json(
          { message: "Meet ID not found in payment" },
          { status: 400 }
        );
      }

      const meet = await Meet.findByIdAndUpdate(
        meetId,
        status === "successful"
          ? { status: "Confirmed", isPaid: true }
          : { status: "cancelled", isPaid: false },
        { new: true }
      );

      if (!meet) {
        return NextResponse.json(
          { message: "Meet not found" },
          { status: 404 }
        );
      }
    } else if (payment.type === "booking") {
      const bookingId = payment.meta._id;

      if (!bookingId) {
        return NextResponse.json(
          { message: "Booking ID not found in payment" },
          { status: 400 }
        );
      }

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        status === "successful"
          ? { status: "Confirmed", isPaid: true }
          : { status: "cancelled", isPaid: false },
        { new: true }
      );

      if (!booking) {
        return NextResponse.json(
          { message: "Booking not found" },
          { status: 404 }
        );
      }
    } else if (payment.type === "membership") {
      const membershipId = payment.meta._id;

      if (!membershipId) {
        return NextResponse.json(
          { message: "Membership ID not found in payment" },
          { status: 400 }
        );
      }

      const membership = await Membership.findById(membershipId);

      if (!membership) {
        return NextResponse.json(
          { message: "Membership not found" },
          { status: 404 }
        );
      }

      const user = await User.findByIdAndUpdate(
        payment.userId,
        { membershilp: membership.name },
        { new: true }
      );
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    }

    // await sendEmail({
    //   to: payment.confirmEmail || payment.userId.email,
    //   subject: `Payment ${status}`,
    //   text,
    // });

    return NextResponse.json({ message: "Payment status updated", payment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { message: "Error updating payment status", error },
      { status: 500 }
    );
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
    const deleted = await Payment.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
});
