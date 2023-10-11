import {
  viewIndex,
  viewAll,
  viewPost,
  viewSeries,
  getGenerateInfo,
  getMetaData,
} from "./GET";
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
    case "VIEW_SERIES":
      return viewSeries();
    case "GET_STATIC_PARAMS":
      return getGenerateInfo();
    case "GET_META_DATA":
      return getMetaData(req);
  }
}
