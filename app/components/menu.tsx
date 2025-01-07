import { redis } from "@/lib/redis"; // Anpassa sökvägen efter din struktur
import NewChat from "./newChat";
import SessionListItem from "./sessionListItem";

const Menu = async () => {
  const sessions = await redis.hgetall("chat_sessions");

  // Omvandla sessions till en array och sortera efter lastModified
  const sortedSessions = sessions
    ? Object.entries(sessions)
        .map(([sessionId, sessionData]) => {
          const parsedData = sessionData as {
            title: string;
            lastModified: number;
          };
          return {
            sessionId,
            ...parsedData,
          };
        })
        .sort((a, b) => b.lastModified - a.lastModified)
    : [];

  return (
    <div className="h-full z-index-1 w-[200px] bg-zinc-900 text-white p-4">
      <NewChat />

      <ul className="mt-8">
        {sessions &&
          sortedSessions.map(({ sessionId, title }) => (
            <SessionListItem
              key={sessionId}
              sessionId={sessionId}
              title={title as string}
            />
          ))}
      </ul>
    </div>
  );
};

export default Menu;
