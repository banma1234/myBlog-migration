import { connectToDatabase } from "util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const options = {
      sort: { postId: -1 },
      projection: {
        _id: 0,
        title: 1,
        uploadDate: 1,
        thumbnail: 1,
        postId: 1,
        description: 1,
      },
    };

    const res = await db
      .collection("posts")
      .find({ postId: { $in: [28, 2, 3] } }, options)
      .toArray();

    return NextResponse.json({
      data: res,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to GET recommended posts",
      success: false,
    });
  }
}
