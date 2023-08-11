import { viewIndex, viewAll } from "./GET";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const viewType = req.headers.get("viewtype");

  switch (viewType) {
    case "VIEW_INDEX":
      return viewIndex();
    case "VIEW_ALL":
      return viewAll();
  }
}
