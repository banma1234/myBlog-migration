import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function viewPost(req: NextRequest) {
  try {
    let postId = req.headers.get("postid");
    let { db } = await connectToDatabase();
    const options = {
      projection: {
        _id: 0,
        images: 0,
        thumbnail: 0,
        isThumbnail: 0,
      },
    };
    const options2 = {
      sort: { uploadDate: -1 },
      projection: {
        _id: 0,
        postId: 1,
        title: 1,
        uploadDate: 1,
        thumbnail: 1,
        isThumbnail: 1,
        series: 1,
      },
    };

    const posts = await db
      .collection("posts")
      .find({ postId: Number(postId) }, options)
      .toArray();

    let recentPosts = undefined;
    try {
      let temp = await db
        .collection("posts")
        .find(
          { series: posts[0].series, postId: { $ne: Number(postId) } },
          options2,
        )
        .limit(3)
        .toArray();

      if (temp) recentPosts = temp;
    } catch {
      console.log("no recent posts");
    }

    return NextResponse.json({
      data: posts,
      recent: recentPosts,
      success: true,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      data: e,
      recent: undefined,
      success: false,
    });
  }
}
