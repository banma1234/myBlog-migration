import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function deletePosts(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    let targets = await req
      .json()
      .then((res) => res.split(",").map((item: string) => Number(item)));

    let temp = await db
      .collection("posts")
      .count()
      .then((res: number) =>
        targets
          .filter((item: number) => item != res)
          .map((item: number) => item++)
      );

    await db.collection("posts").deleteMany({ postId: { $in: targets } });

    await db
      .collection("posts")
      .updateMany({ postId: { $in: temp } }, { $inc: { postId: -1 } });

    return NextResponse.json({
      data: "posts deleted successfully",
      success: true,
    });
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({
      data: "failed to DELETE posts",
      success: false,
    });
  }
}
