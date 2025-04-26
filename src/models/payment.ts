import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String },
    type: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["credit card", "crypto", "bank transfer", "cashApp"],
      required: true,
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "successful", "failed", "refunded"],
      default: "pending",
    },
    meta: { type: Object },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default Payment;
