import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "app/util/mongodb";

export default async function getComment(req: NextRequest) {
  try {
    const postId = req.headers.get("postid");
    const { db } = await connectToDatabase();
    const options = {
      sort: { REF: 1, RE_STEP: 1 },
      projection: {
        REF: 1,
        RE_STEP: 1,
        RE_LEVEL: 1,
        writter: 1,
        content: 1,
        date: 1,
      },
    };

    const comments = await db
      .collection("comments")
      .find({ postId: Number(postId) }, options)
      .toArray();

    return NextResponse.json({
      message: comments,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}
