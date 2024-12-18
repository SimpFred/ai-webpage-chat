import ChatWrapper from "../components/chatWrapper";
import { ragChat } from "../../lib/rag-chat";
import { redis } from "../../lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
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
  async function addUrlsInBatches(urls: string[], batchSize: number) {
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await redis.sadd("indexed-urls", ...(batch as [string, ...string[]]));
    }
  }

  if (isAlreadyIndexed === 0) {
    await ragChat.context.add({
      type: "html",
      source: recounstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 500 },
    });

    const urlsToAdd = [recounstructedUrl]; // Lägg till fler URL:er om det behövs
    const batchSize = 1000; // Max batchstorlek
    await addUrlsInBatches(urlsToAdd, batchSize);
  }

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};
export default Page;
