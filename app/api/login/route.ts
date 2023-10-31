import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { email, password } = await req.json();
    const options = {
      sort: { postId: 1 },
      projection: { _id: 0 },
    };

    const userData = await db
      .collection("user")
      .find({ email: email }, options)
      .toArray();

    const res = await bcrypt.compare(password, userData[0].password);
    if (!res) {
      return NextResponse.json({
        data: "invalid password",
        success: false,
      });
    }

    delete userData[0]["password"];

    return NextResponse.json({
      data: userData[0],
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
