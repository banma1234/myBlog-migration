import { NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";

export default async function getParams() {
  const { db } = await connectToDatabase();
  const count = await db.collection("posts").count();

  if (!count) {
    return NextResponse.json(
      { error: "documents not found" },
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  return NextResponse.json(
    { count: count },
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
