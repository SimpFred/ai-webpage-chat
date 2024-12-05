import { ragChat } from "@/app/lib/rag-chat";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
      const { messages, sessionId } = await req.json();
      const lastMessage = messages[messages.length - 1].content;
  
      const response = await ragChat.chat(lastMessage);
      console.log("response", response);
  
      return NextResponse.json(response);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };


