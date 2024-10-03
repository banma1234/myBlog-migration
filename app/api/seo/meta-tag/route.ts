import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export async function GET() {
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
        postId: 1,
        uploadDate: 1,
      },
    };
    const res = await db.collection("posts").find({}, options).toArray();

    if (!res.length) {
      return NextResponse.json(
        { error: "documents not found" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(
      { data: res },
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
