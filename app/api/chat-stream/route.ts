import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface SessionData {
  title: string;
  lastModified: number;
}

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage || !sessionId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Kontrollera om sessionId redan finns
    const existingSession: SessionData | null = await redis.hget(
      "chat_sessions",
      sessionId
    );

    if (!existingSession) {
      // Skapa en titel via RAG
      const titleResponse = await ragChat.chat(
        `Based on the context of this message, please come up with a suitable title for this chat. Only return the title and nothing else not even '"'. Message: "${lastMessage}"`,
        {
          sessionId,
          disableRAG: true,
        }
      );

      const title = titleResponse.output.trim();
      const lastModified = Date.now();

      // Spara sessionId, titel och lastModified i Redis-hashen
      await redis.hset("chat_sessions", {
        [sessionId]: JSON.stringify({
          title: title,
          lastModified: lastModified,
        }),
      });
      // Radera alla nuvarande meddelanden i sessionen (titel frågan och svaret) för att inte spara den i chat historiken
      ragChat.history.deleteMessages({ sessionId });
    } else {
      existingSession.lastModified = Date.now();

      // Spara den uppdaterade sessionen
      await redis.hset("chat_sessions", {
        [sessionId]: JSON.stringify(existingSession),
      });
    }

    // Skapa eller uppdatera chat-sessionen
    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
      disableRAG: true,
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
