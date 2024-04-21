import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function deleteComment(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    let newBody = await req.json();
    const option = {
      projection: {
        _id: 1,
        password: 1,
        RE_STEP: 1,
      },
    };

    let targetComment = await db
      .collection("comments")
      .find(
        {
          _id: new ObjectId(newBody._id),
          password: newBody.password,
        },
        option
      )
      .toArray();

    if (targetComment && targetComment.length > 0) {
      await db.collection("comments").updateMany(
        {
          REF: newBody.REF,
          RE_STEP: {
            $gte: targetComment[0].RE_STEP,
          },
        },
        {
          $inc: { RE_STEP: -1 },
        }
      );
      await db.collection("comments").deleteOne({ _id: targetComment[0]._id });

      return NextResponse.json(
        { message: `comment deleted successfully at ${newBody.postId}` },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return NextResponse.json(
        { error: "invalid password error" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
