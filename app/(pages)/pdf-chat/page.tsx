import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import ChatWrapper from "../../components/chatWrapper";

interface PageProps {
  searchParams: {
    file: string;
  };
}

const generateAndSaveNamespace = async (
  fileSource: string,
  sessionId: string
) => {
  try {
    const namespaceResponse = await ragChat.chat(
      `Based on this file source, please come up with a suitable unique namespace for this file. It needs to be specific to only this file and should not be in a URL looking format. Only return the namespace and nothing else, not even '"'. File Source: "${fileSource}"`,
      {
        sessionId,
        disableRAG: true,
      }
    );

    const namespace = namespaceResponse.output.trim();
    const namespaceKey = fileSource.replace(/\//g, "");
    console.log("namespaceKey", namespaceKey);
    await redis.hset("chat_namespace", {
      [namespaceKey]: JSON.stringify({
        namespace,
      }),
    });

    // Radera alla nuvarande meddelanden i sessionen (namespace frågan och svaret) för att inte spara den i chat historiken
    await ragChat.history.deleteMessages({ sessionId });

    return namespace;
  } catch (error) {
    console.error("Error generating and saving namespace:", error);
    throw error;
  }
};

const PdfChat = async ({ searchParams }: PageProps) => {
  try {
    const params = await searchParams;
    const fileSource = params.file;
    console.log("fileSource", fileSource);
    const decodedFileSource = decodeURIComponent(fileSource);
    const sessionCookie = (await cookies()).get("sessionId")?.value;
    const sessionId = (decodedFileSource + "--" + sessionCookie).replace(
      /\//g,
      ""
    );
    console.log("sessionId", sessionId);

    const isAlreadyIndexed = await redis.sismember(
      "indexed-pdfs",
      decodedFileSource
    );

    const initialMessages = await ragChat.history.getMessages({
      amount: 10,
      sessionId: sessionId,
    });

    console.log("isAlreadyIndexed", isAlreadyIndexed);

    if (isAlreadyIndexed === 0) {
      const namespace = await generateAndSaveNamespace(
        decodedFileSource,
        sessionId
      );

      await ragChat.context.add({
        type: "pdf",
        fileSource: decodedFileSource,
        config: { chunkOverlap: 250, chunkSize: 500 },
        options: { namespace: namespace },
      });

      await redis.sadd("indexed-pdfs", decodedFileSource);
    }

    return (
      <ChatWrapper
        apiURL={"/api/web-page-chat-stream"}
        sessionId={sessionId}
        initialMessages={initialMessages}
      />
    );
  } catch (error) {
    console.error("Error in PdfChat component:", error);
    return (
      <div>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default PdfChat;
