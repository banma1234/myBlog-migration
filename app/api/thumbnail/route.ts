import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
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
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${contentType}`,
    };

    const putImagesCommand = new PutObjectCommand(params);
    try {
      const response = await client.send(putImagesCommand);
      console.log(response);
    } catch (e: any) {
      console.log(e);
    }
    imageContainer.push({
      data: imageBuffer,
      contentType: imageTitle[0].split(".").pop(), // Replace this with the actual content type of the image
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
