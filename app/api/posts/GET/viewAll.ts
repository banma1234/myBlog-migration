import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function viewAll() {
  try {
    const { db } = await connectToDatabase();
    const options = {
      sort: { uploadDate: -1 },
      projection: {
        _id: 0,
        title: 1,
        uploadDate: 1,
        thumbnail: 1,
      },
    };

    const posts = await db.collection("posts").find({}, options).toArray();
    const res = posts.json();

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