import ChatWrapper from "@/app/components/chatWrapper";
import Menu from "@/app/components/menu";
import { ragChat } from "@/lib/rag-chat";
import { cookies } from "next/headers";

export default async function Chat() {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const sessionId = sessionCookie?.toString() || "default-session";

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId: sessionId,
  });

  return (
    <div className="grid grid-cols-[auto,1fr] h-screen">
      <Menu />
      <ChatWrapper
        apiURL={"/api/llm-stream"}
        sessionId={sessionId}
        initialMessages={initialMessages}
      />
    </div>
  );
}
