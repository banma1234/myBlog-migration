import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export default async function addPost(req: NextRequest) {
  try {
    const {
      title,
      content,
      series,
      hashtag,
      description,
      images,
      uploadDate,
      imageTitle,
      isThumbnail,
    } = await req.json();

    let { db } = await connectToDatabase();
    const client = new S3Client({
      region: "kr-standard",
      endpoint: process.env.AWS_HOSTNAME,
    });
    let inherentThumbnail = null;

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i].split(",")[1];
        const imageBuffer = Buffer.from(base64Data, "base64");
        const contentType = imageTitle[i].split(".").pop();

        const params = {
          Bucket: "choco-image",
          Key: `images/${imageTitle[i]}`,
          Body: imageBuffer,
          ACL: ObjectCannedACL.public_read,
          ContentEncoding: "base64",
          ContentType: `image/${contentType}`,
        };
        if (isThumbnail && i === 1) {
          inherentThumbnail = `${process.env.NAVER_CDN_URL}/images/${imageTitle[i]}`;
        }

        const putImagesCommand = new PutObjectCommand(params);
        try {
          const response = await client.send(putImagesCommand);
          console.log(response);
        } catch (e: any) {
          console.log(e);
        }
      }
    }

    let seriesThumbnail = null;
    try {
      const option = { projection: { _id: 0, images: 0 } };
      const temp = await db
        .collection("thumbnail")
        .findOne({ series: series }, option);

      seriesThumbnail = `${process.env.NAVER_CDN_URL}/thumbnail/${temp.imageTitle}`;
    } catch {
      seriesThumbnail = `${process.env.NAVER_CDN_URL}/thumbnail/default/default_thumbnail.svg`;
    }

    let postId = await db.collection("posts").count();

    await db
      .collection("posts")
      .insertOne({
        postId: ++postId,
        title,
        content,
        series,
        hashtag,
        description,
        thumbnail: isThumbnail ? inherentThumbnail : seriesThumbnail,
        imageTitle: imageTitle,
        isThumbnail,
        uploadDate,
      })
      .catch((e: unknown) => {
        console.log(e);
        return NextResponse.json(
          { error: "target not found : ADD" },
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      });

    return NextResponse.json(
      { message: `comment added successfully at ${++postId}` },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
