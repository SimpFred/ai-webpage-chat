import { NextResponse } from "next/server";

export async function POST() {
  // API-route returnerar bara en tom respons, middleware hanterar sessionId
  return NextResponse.json({ message: "Session handled by middleware" });
}
