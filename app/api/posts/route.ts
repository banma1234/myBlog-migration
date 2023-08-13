import { viewIndex, viewAll, viewPost, getGenerateInfo } from "./GET";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const viewType = req.headers.get("viewtype");

  switch (viewType) {
    case "VIEW_INDEX":
      return viewIndex();
    case "VIEW_ALL":
      return viewAll();
    case "VIEW_POST":
      return viewPost(req);
    case "GET_STATIC_PARAMS":
      return getGenerateInfo();
  }
}
