import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getMetaData() {
  try {
    const { db } = await connectToDatabase();
    const options = {
      sort: { postId: 1 },
      projection: {
        _id: 0,
        title: 1,
        hashtag: 1,
        description: 1,
        thumbnail: 1,
      },
    };

    const res = await db.collection("posts").find({}, options).toArray();

    return NextResponse.json({
      data: res,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to GET metaData",
      success: false,
    });
  }
}
