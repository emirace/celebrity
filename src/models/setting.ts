import mongoose, { Schema, Document } from "mongoose";

const SettingSchema = new Schema({
  bankingInfo: {
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
  mail: {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  cashApp: {
    tag: { type: String },
    name: { type: String },
  },
  whatsApp: { type: String },
});

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
export default Setting;
