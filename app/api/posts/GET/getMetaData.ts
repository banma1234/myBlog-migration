import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getMetaData(req: NextRequest) {
  try {
    let postId = req.headers.get("postid");
    let { db } = await connectToDatabase();

    const options = {
      _id: 0,
      title: 1,
      hashtag: 1,
      description: 1,
      thumbnail: 1,
    };

    const metaData = await db
      .collection("posts")
      .find({ postId: Number(postId) }, options)
      .toArray();

    return NextResponse.json({
      data: metaData,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: e,
      success: false,
    });
  }
}
