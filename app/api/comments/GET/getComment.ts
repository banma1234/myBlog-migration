import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getComment(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postid");

  try {
    const { db } = await connectToDatabase();
    const options = {
      sort: { REF: 1, RE_STEP: 1 },
    };

    const comment = await db
      .collection("comments")
      .find({ postId: Number(postId) }, options)
      .toArray();

    return NextResponse.json(
      { comment: comment },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
