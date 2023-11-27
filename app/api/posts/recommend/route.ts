import { connectToDatabase } from "util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
      .find({ postId: { $in: [28, 2, 3] } }, options)
      .toArray();

    if (!res.length) {
      return new NextResponse(JSON.stringify({ error: "No posts found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify({ data: res }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
