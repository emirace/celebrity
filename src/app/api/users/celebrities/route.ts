import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 20;
  const skip = (Number(page) - 1) * Number(limit);
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const sortOrder = order === "asc" ? 1 : -1;
  const query = search
    ? {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  const total = await User.countDocuments({ ...query, role: "Celebrity" });
  const totalPages = Math.ceil(total / Number(limit));
  const celebrities = await User.find({ ...query, role: "Celebrity" })
    .select("image fullName job")
    .sort({ [sort]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  return new NextResponse(
    JSON.stringify({
      total,
      totalPages,
      page: Number(page),
      limit: Number(limit),
      celebrities,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const POST = auth(async function POST(request) {
  try {
    await connectDB();

    if (request.user.role !== "Admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const {
      fullName,
      email,
      username,
      image,
      job,
      mobile,
      nationality,
      dob,
      gender,
      age,
      meetFee,
      bookingFee,
      fanCardFee,
    } = await request.json();
    const user = await User.create({
      fullName,
      email,
      username,
      image,
      role: "Celebrity",
      job: job.split(",").map((job: string) => job.trim()),
      mobile,
      nationality,
      dob,
      gender,
      age,
      meetFee,
      bookingFee,
      fanCardFee,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
});
