import { NextRequest, NextResponse } from "next/server";

import getComment from "./GET/getComment";
import deleteComment from "./DELETE/deleteComment";
import { addComment, addReply } from "./POST";

export async function GET(req: NextRequest) {
  return getComment(req);
}

export async function POST(req: NextRequest) {
  const commentType = req.headers.get("commenttype");

  switch (commentType) {
    case "DEFAULT":
      return addComment(req);
    case "REPLY":
      return addReply(req);
    default:
      return NextResponse.json(
        { error: "invalid comment type" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
  }
}

export async function DELETE(req: NextRequest) {
  return deleteComment(req);
}
