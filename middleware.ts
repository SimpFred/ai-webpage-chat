import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookie = req.cookies.get("sessionId");
  const isNewSessionRequest = req.nextUrl.pathname === "/api/new-session";

  if (!cookie || isNewSessionRequest) {
    // Skapa ett nytt sessionId om ingen finns eller om det begärs
    res.cookies.set("sessionId", crypto.randomUUID());
  }

  return res;
}
