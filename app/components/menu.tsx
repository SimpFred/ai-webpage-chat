import { redis } from "@/lib/redis"; // Anpassa sökvägen efter din struktur
import DraggableMenu from "./draggableMenu";

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

  return <DraggableMenu sessions={sortedSessions} />;
};

export default Menu;
