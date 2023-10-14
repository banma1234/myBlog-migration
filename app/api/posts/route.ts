import {
  viewIndex,
  viewAll,
  viewPost,
  viewSeries,
  getGenerateInfo,
} from "./GET";
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
    default:
      return NextResponse.json({
        data: "failed to GET postsData : 400",
        success: false,
      });
  }
}
