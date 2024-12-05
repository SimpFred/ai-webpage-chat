import ChatWrapper from "../components/chatWrapper";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";

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
  const { url } = await params;
  const recounstructedUrl = reconstructUrl({ url: url as string[] });
  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    recounstructedUrl
  );

  const sessionId = "mock-session-id";

  console.log("isAlreadyIndexed", isAlreadyIndexed);

  if (isAlreadyIndexed === 0) {
    await ragChat.context.add({
      type: "html",
      source: recounstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", recounstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} />;
};
export default Page;
