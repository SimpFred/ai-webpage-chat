import ChatWrapper from "../../components/chatWrapper";
import { ragChat } from "../../../lib/rag-chat";
import { redis } from "../../../lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{
    url: string | string[] | undefined;
  }>;
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents.join("/");
}

const generateAndSaveNamespace = async (
  recounstructedUrl: string,
  sessionId: string
) => {
  try {
    const namespaceResponse = await ragChat.chat(
      `Based on this url, please come up with a suitable unique namespace for this URL. It needs to be specific to only this URL. Only return the namespace and nothing else, not even '"'. URL: "${recounstructedUrl}"`,
      {
        sessionId,
        disableRAG: true,
      }
    );

    const namespace = namespaceResponse.output.trim();
    const namespaceKey = recounstructedUrl.replace(/\//g, "");
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = async ({ params }: PageProps) => {
  try {
    const sessionCookie = (await cookies()).get("sessionId")?.value;
    const { url } = await params;
    const recounstructedUrl = reconstructUrl({ url: url as string[] });
    const sessionId = (recounstructedUrl + "--" + sessionCookie).replace(
      /\//g,
      ""
    );

    const isAlreadyIndexed = await redis.sismember(
      "indexed-urls",
      recounstructedUrl
    );

    const initialMessages = await ragChat.history.getMessages({
      amount: 10,
      sessionId: sessionId,
    });

    console.log("isAlreadyIndexed", isAlreadyIndexed);

    if (isAlreadyIndexed === 0) {
      const namespace = await generateAndSaveNamespace(
        recounstructedUrl,
        sessionId
      );

      await ragChat.context.add({
        type: "html",
        source: recounstructedUrl,
        config: { chunkOverlap: 250, chunkSize: 500 },
        options: { namespace: namespace },
      });

      await redis.sadd("indexed-urls", recounstructedUrl);
    }

    return (
      <ChatWrapper
        apiURL={"/api/web-page-chat-stream"}
        sessionId={sessionId}
        initialMessages={initialMessages}
      />
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    return (
      <div>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default Page;
