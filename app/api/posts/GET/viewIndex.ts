import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function viewIndex() {
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
      .find({}, options)
      .limit(6)
      .toArray();

    return NextResponse.json({
      data: res,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to GET indexBoard",
      success: false,
    });
  }
}
