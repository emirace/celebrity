import Setting from "@/models/setting";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

// GET handler — fetch settings or create default
export async function GET() {
  try {
    await connectDB();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        bankingInfo: {
          accountNumber: "000000000",
          accountName: "Default Account",
          bankName: "Default Bank",
          routing: "rout12345",
          address: "sample address",
        },
        cryptoInfo: [
          {
            name: "Bitcoin",
            network: "BTC",
            address: "1BitcoinAddressExample123",
            rate: 1,
          },
        ],
        mail: {
          name: "example@gmail.com",
          password: "1234567890",
        },
        cashApp: {
          tag: "cashAppTag",
          name: "cashAppTag",
        },
        whatsApp: "whatsapp",
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const PUT = auth(async function PUT(req) {
  try {
    await connectDB();

    if (req.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const { bankingInfo, cryptoInfo, mail, cashApp, whatsApp } =
      await req.json();

    if (!bankingInfo || !cryptoInfo || !mail || !cashApp) {
      return NextResponse.json(
        { message: "Banking and Crypto info are required" },
        { status: 400 }
      );
    }

    const updatedSettings = await Setting.findOneAndUpdate(
      {},
      { bankingInfo, cryptoInfo, mail, cashApp, whatsApp },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
});
