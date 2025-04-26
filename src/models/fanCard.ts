import mongoose, { Schema, Types } from "mongoose";

const FanCardSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    celebrityId: { type: Types.ObjectId, ref: "User", required: true },
    fandomTheme: { type: String, required: true },
    photoUrl: { type: String },
    nickname: { type: String },
    fanId: { type: String },
    isPaid: { type: String, default: false },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const FanCard =
  mongoose.models.FanCard || mongoose.model("FanCard", FanCardSchema);

export default FanCard;
