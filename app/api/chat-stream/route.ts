import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
    });

    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
