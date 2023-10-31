import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getComment(req: NextRequest) {
  try {
    const postId = req.headers.get("postid");
    const { db } = await connectToDatabase();
    const options = {
      sort: { REF: 1, RE_STEP: 1 },
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
      message: "failed to GET comment",
      success: false,
    });
  }
}
