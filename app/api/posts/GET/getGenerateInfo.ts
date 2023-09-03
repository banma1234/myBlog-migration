import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getGenerateInfo() {
  try {
    const { db } = await connectToDatabase();
    const options = {
      projection: {
        _id: 0,
        postId: 1,
      },
    };

    const res = await db.collection("posts").count();

    return NextResponse.json({
      data: res,
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
