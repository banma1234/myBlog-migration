import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function addComment(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const newBody = await req.json();

    if (newBody.isAdmin) {
      newBody.profile =
        "https://choco-image-server.cdn.ntruss.com/user/profile/admin.png";
    }

    await db.collection("comments").insertOne(newBody);

    return NextResponse.json({
      message: "Comment added successfully",
      success: true,
    });
  } catch (e: unknown) {
    return NextResponse.json({
      message: "failed to POST comment : 500",
      success: false,
    });
  }
}
