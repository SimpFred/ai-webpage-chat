import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";
interface NamespaceData {
  namespace: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const [encodedUrl] = sessionId.split("--");
    const namespace: NamespaceData | null = await redis.hget(
      "chat_namespace",
      encodedUrl
    );

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
      namespace: namespace?.namespace,
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
