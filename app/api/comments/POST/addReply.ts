import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function addReply(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const newBody = await req.json();

    let lastComment = await db
      .collection("comments")
      .find({
        REF: newBody.REF,
        RE_LEVEL: newBody.RE_LEVEL,
      })
      .sort({ RE_STEP: -1 })
      .limit(1)
      .toArray();

    let targetStep = 0;
    if (lastComment && lastComment.length > 0) {
      targetStep = lastComment[0].RE_STEP + 1;
      newBody.RE_STEP = targetStep;
    } else {
      targetStep = newBody.RE_STEP;
    }

    await db.collection("comments").updateMany(
      {
        REF: newBody.REF,
        RE_STEP: {
          $gte: targetStep,
        },
      },
      {
        $inc: { RE_STEP: 1 },
      },
    );

    await db.collection("comments").insertOne(newBody);

    return NextResponse.json({
      message: "Comment added successfully",
      success: true,
    });
  } catch (e: unknown) {
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}
