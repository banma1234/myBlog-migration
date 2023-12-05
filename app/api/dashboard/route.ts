import { NextRequest, NextResponse } from "next/server";
import { viewAll, viewIndex, viewRecommend, viewSeries } from "./GET";

export async function GET(req: NextRequest) {
  const viewType = req.nextUrl.searchParams.get("viewtype");

  switch (viewType) {
    case "all":
      return viewAll();
    case "index":
      return viewIndex();
    case "recommend":
      return viewRecommend();
    case "series":
      return viewSeries();
    default:
      return NextResponse.json(
        { error: "unexpected viewType" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
  }
}
