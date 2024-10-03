import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
import { cookies } from "next/headers";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { verifyJwt } from "app/auth/handleJWT";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token");

  if (!token || verifyJwt(token.value)) {
    return NextResponse.json(
      { message: `Authentication failed` },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { series, images, imageTitle } = await req.json();
    let { db } = await connectToDatabase();
    const client = new S3Client({
      region: "kr-standard",
      endpoint: process.env.AWS_HOSTNAME,
    });
    const imageContainer = [];

    const base64Data = images[0].split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");
    const contentType = imageTitle[0].split(".").pop();

    const params = {
      Bucket: "choco-image",
      Key: `thumbnail/${imageTitle[0]}`,
      Body: imageBuffer,
      ACL: ObjectCannedACL.public_read,
      ContentType: `image/${contentType}`,
    };

    await client
      .send(new PutObjectCommand(params))
      .then(() => console.log("success"))
      .catch((e) => {
        console.log(e);
      });

    imageContainer.push({
      data: imageBuffer,
      contentType: imageTitle[0].split(".").pop(),
    });

    await db.collection("thumbnail").insertOne({
      series,
      imageTitle: imageTitle[0],
      images: imageContainer[0],
    });

    return NextResponse.json({
      message: "Thumbnail added successfully",
      success: true,
    });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({
      message: "Failed to add thumbnail",
      success: false,
    });
  }
}
