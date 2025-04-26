import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const region = process.env.AWS_BUCKET_REGION || "";
const bucket = process.env.AWS_S3_BUCKET_NAME || "";

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  console.log("key", key);
  if (!key) {
    return NextResponse.json({ message: "No key provided" }, { status: 400 });
  }

  const s3Params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(s3Params);
    const response = await s3.send(command);

    if (!response.Body) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    const str = await response.Body.transformToByteArray();
    const bodyBuffer = Buffer.from(str);

    return new NextResponse(bodyBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.ContentType || "application/octet-stream",
        "Content-Length": bodyBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving image from S3" },
      { status: 500 }
    );
  }
}
