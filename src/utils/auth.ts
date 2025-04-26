/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const secret = process.env.JWT_SECRET!;

export function auth(
  handler: (
    req: NextRequest & { user?: any },
    ctx: { params: Promise<{ id: string }> }
  ) => Promise<Response> | Response
) {
  return async function (
    req: NextRequest,
    ctx: { params: Promise<{ id: string }> }
  ) {
    try {
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ message: "No token provided" }), {
          status: 401,
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, secret);

      (req as NextRequest & { user?: any }).user = decoded;

      return handler(req as NextRequest & { user: any }, ctx);
    } catch (err) {
      console.error("Authentication error:", err);
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 401 }
      );
    }
  };
}
