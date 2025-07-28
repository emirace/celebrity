import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema({
  bankingInfo: {
    status: { type: Boolean, default: false },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    bankName: { type: String, required: true },
    routing: { type: String, required: true },
    address: { type: String, required: true },
  },
  cryptoInfo: [
    {
      name: { type: String, required: true },
      network: { type: String, required: true },
      address: { type: String, required: true },
      rate: { type: Number, required: true },
    },
  ],
  email: { type: String },
  cryptoStatus: { type: Boolean, default: false },
  cashApp: {
    status: { type: Boolean, default: false },
    tag: { type: String },
    name: { type: String },
  },
  whatsApp: { type: String },
  securityFee: { type: Number, default: 0 },
});

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
export default Setting;
