import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getGenerateInfo() {
  try {
    const { db } = await connectToDatabase();
    const options = {
      sort: { postId: 1 },
      projection: {
        _id: 0,
        uploadDate: 1,
      },
    };
    const res = await db.collection("posts").count();
    const date = await db.collection("posts").find({}, options).toArray();

    return NextResponse.json({
      data: res,
      date: date,
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to GET staticparams",
      success: false,
    });
  }
}
