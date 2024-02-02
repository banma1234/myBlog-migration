import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function addComment(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const newBody = await req.json();

    if (newBody.isAdmin) {
      newBody.profile =
        "https://choco-image-server.cdn.ntruss.com/user/profile/admin.png";
    }

    await db.collection("comments").insertOne(newBody);

    return NextResponse.json(
      { message: `comment added successfully at ${newBody.postId} : DEFAULT` },
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
