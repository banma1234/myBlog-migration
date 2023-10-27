import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default async function rewritePost(req: NextRequest) {
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
      postid,
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
          ACL: "public-read",
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
      seriesThumbnail = await db
        .collection("thumbnail")
        .findOne({ series: series }, option);

      seriesThumbnail = `${process.env.NAVER_CDN_URL}/thumbnail/${seriesThumbnail.imageTitle}`;
    } catch {
      seriesThumbnail = null;
    }

    await db.collection("posts").updateOne(
      { postId: postid },
      {
        postId: postid,
        title,
        content,
        series,
        hashtag,
        description,
        thumbnail: isThumbnail ? inherentThumbnail : seriesThumbnail,
        imageTitle: imageTitle,
        isThumbnail,
        uploadDate,
      },
    );

    return NextResponse.json({
      data: "post added successfully",
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to PUT data",
      success: false,
    });
  }
}
