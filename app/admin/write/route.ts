import { NextResponse } from "next/server";

export function redirectToWrite() {
  return NextResponse.redirect("/admin/write/new");
}
