import {
  viewIndex,
  viewAll,
  viewPost,
  viewSeries,
  viewRecommendPost,
  getGenerateInfo,
  getMetaData,
} from "./GET";
import addPost from "./POST/addPost";
import rewritePost from "./PUT/rewritePost";
import deletePosts from "./DELETE/deletePosts";
import { getServerSession } from "next-auth/next";
import { authConfig } from "app/auth/auth";
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
    case "VIEW_RECOMMENDED_POST":
      return viewRecommendPost();
    case "GET_STATIC_PARAMS":
      return getGenerateInfo();
    case "GET_META_DATA":
      return getMetaData();
    default:
      return NextResponse.json({
        data: "failed to GET postsData : 400 " + viewType,
        success: false,
      });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  return session ? addPost(req) : accessDenied();
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authConfig);
  return session ? rewritePost(req) : accessDenied();
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authConfig);
  return session ? deletePosts(req) : accessDenied();
}

function accessDenied() {
  return NextResponse.json({
    data: "access Denied",
    success: false,
  });
}
