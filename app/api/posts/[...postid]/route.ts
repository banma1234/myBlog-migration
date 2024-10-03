import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { postid: string } }
) {
  try {
    let postId = params.postid[0];
    let { db } = await connectToDatabase();
    const options = {
      projection: {
        _id: 0,
        images: 0,
        isThumbnail: 0,
      },
    };
    const options2 = {
      sort: { uploadDate: 1 },
      projection: {
        _id: 0,
        postId: 1,
        title: 1,
        series: 1,
        uploadDate: 1,
        thumbnail: 1,
        description: 1,
      },
    };
    const options3 = {
      sort: { postId: -1 },
      projection: {
        _id: 0,
        title: 1,
        postId: 1,
      },
    };

    const post = await db
      .collection("posts")
      .find({ postId: Number(postId) }, options)
      .toArray();

    if (!post.length) {
      return NextResponse.json(
        { error: "post not found" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    let recentPosts = undefined;
    try {
      let temp = await db
        .collection("posts")
        .find({ series: post[0].series, postId: { $ne: postId } }, options2)
        .toArray();

      if (temp) recentPosts = temp;
    } catch {
      console.log("no recent post");
    }

    let both = await db
      .collection("posts")
      .find(
        { postId: { $in: [Number(postId) + 1, Number(postId) - 1] } },
        options3
      )
      .toArray();

    if (both.length !== 2) {
      if (postId === "1") {
        both = [null, ...both];
      } else {
        both = [...both, null];
      }
    }

    return NextResponse.json(
      {
        post: post[0],
        recent: recentPosts,
        bothSidePosts: both,
      },
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
