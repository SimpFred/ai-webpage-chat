import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  const sessions = await redis.hgetall("chat_sessions");
  return NextResponse.json(sessions);
}
