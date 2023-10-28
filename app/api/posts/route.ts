import {
  viewIndex,
  viewAll,
  viewPost,
  viewSeries,
  getGenerateInfo,
  getMetaData,
} from "./GET";
import addPost from "./POST/addPost";
import rewritePost from "./PUT/rewritePost";
import deletePosts from "./DELETE/deletePosts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const viewType = req.headers.get("viewtype");

  switch (viewType) {
    case "VIEW_INDEX":
      return viewIndex();
    case "VIEW_ALL":
      return viewAll();
    case "VIEW_POST":
      return viewPost(req);
    case "VIEW_SERIES":
      return viewSeries();
    case "GET_STATIC_PARAMS":
      return getGenerateInfo();
    case "GET_META_DATA":
      return getMetaData(req);
    default:
      return NextResponse.json({
        data: "failed to GET postsData : 400",
        success: false,
      });
  }
}

export async function POST(req: NextRequest) {
  return addPost(req);
}

export async function PUT(req: NextRequest) {
  return rewritePost(req);
}

export async function DELETE(req: NextRequest) {
  return deletePosts(req);
}
