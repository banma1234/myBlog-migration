import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function addComment(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const newBody = await req.json();

    await db.collection("comments").insertOne(newBody);

    return NextResponse.json({
      message: "Comment added successfully",
      success: true,
    });
  } catch (e: unknown) {
    // return an error
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}