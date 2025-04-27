import mongoose, { Schema, Types } from "mongoose";

const BookingSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    serviceType: { type: String },
    category: { type: String },
    bookingID: { type: String },
    celebrityId: { type: Types.ObjectId, ref: "User", required: true },
    datetime: { type: Date, required: true },
    isPaid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
