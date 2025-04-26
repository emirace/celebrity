import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  image: { type: String },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  job: [{ type: String }],
  role: { type: String, enum: ["Admin", "User", "Celebrity"], default: "User" },
  username: { type: String },
  address: { type: String },
  dob: { type: Date },
  gender: { type: String },
  mobile: { type: String },
  nationality: { type: String },
  meetFee: { type: Number },
  bookingFee: { type: Number },
  fanCardFee: { type: Number },
  membership: { type: Schema.Types.ObjectId, ref: "Membership" },
  security: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
