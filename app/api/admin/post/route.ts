import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "app/auth/handleJWT";
import { cookies } from "next/headers";
import addPost from "./POST/addPost";
import deletePosts from "./DELETE/deletePosts";
import rewritePost from "./PUT/rewritePost";

export async function POST(req: NextRequest) {
  authentication(req);
  return addPost(req);
}

export async function DELETE(req: NextRequest) {
  authentication(req);
  return deletePosts(req);
}

export async function PUT(req: NextRequest) {
  authentication(req);
  return rewritePost(req);
}

async function authentication(req: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("next-auth.session-token");

  if (!token || verifyJwt(token.value)) {
    return NextResponse.json(
      { message: `Authentication failed` },
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }
}
