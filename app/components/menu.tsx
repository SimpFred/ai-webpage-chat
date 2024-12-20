import { redis } from "@/lib/redis"; // Anpassa sökvägen efter din struktur
import NewChat from "./newChat";
import SessionListItem from "./sessionListItem";

const Menu = async () => {
  const sessions = await redis.hgetall("chat_sessions");

  return (
    <div className="h-full z-index-1 w-[200px] bg-zinc-900 text-white p-4">
      <NewChat />

      <ul className="mt-8">
        {sessions &&
          Object.entries(sessions).map(([sessionId, title]) => (
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
