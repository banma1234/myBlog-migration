import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "util/mongodb";
import { signJwtAccessToken } from "app/auth/handleJWT";
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
      return NextResponse.json(
        { error: "invalid password" },
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    delete userData[0]["password"];
    const token = signJwtAccessToken(userData[0]);

    return NextResponse.json(
      { userData: { ...userData[0], token: token } },
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
