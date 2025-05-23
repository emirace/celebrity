import User from "@/models/user";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  await connectDB();
  if (request.user.role !== "Admin") {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

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
    .select("-password")
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
});
