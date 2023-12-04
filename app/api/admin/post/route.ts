import { NextRequest } from "next/server";
import addPost from "./POST/addPost";
import deletePosts from "./DELETE/deletePosts";
import rewritePost from "./PUT/rewritePost";

export async function POST(req: NextRequest) {
  return addPost(req);
}

export async function DELETE(req: NextRequest) {
  return deletePosts(req);
}

export async function PUT(req: NextRequest) {
  return rewritePost(req);
}
