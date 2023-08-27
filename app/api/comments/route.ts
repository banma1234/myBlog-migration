import { NextRequest } from "next/server";

import getComment from "./GET/getComment";
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
  }
}
