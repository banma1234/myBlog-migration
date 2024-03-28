import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function deletePosts(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    let targets = await req
      .json()
      .then(res => res.split(",").map((item: string) => Number(item)));

    if (!targets.length) {
      return NextResponse.json(
        { error: "posts not found : viewAll" },
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    let temp = await db
      .collection("posts")
      .count()
      .then((res: number) =>
        targets
          .filter((item: number) => item != res)
          .map((item: number) => item++),
      );

    await db
      .collection("posts")
      .deleteMany({ postId: { $in: targets } })
      .catch((e: unknown) => {
        console.log(e);
        return NextResponse.json(
          { error: "target not found : DELETE" },
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      });

    await db
      .collection("posts")
      .updateMany({ postId: { $in: temp } }, { $inc: { postId: -1 } });

    return NextResponse.json(
      { message: `comment deleted successfully at ${targets}` },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
