import mongoose, { Types } from "mongoose";

const MeetSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passport: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    celebrityId: { type: Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    occupation: { type: String, required: true },
    gender: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    duration: { type: String, required: true },
    meetId: { type: String, required: true },
    isPaid: { type: String, default: false },
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

const Meet = mongoose.models.Meet || mongoose.model("Meet", MeetSchema);

export default Meet;
