import { Link } from "lucide-react";

// create interface for MessageList
interface MessageListProps {
  sessions: Record<string, unknown> | null;
}

const MessageList = ({ sessions }: MessageListProps) => {
  return (
    <ul className="mt-8">
      {sessions &&
        Object.entries(sessions).map(([sessionId, title]) => (
          <li key={sessionId} className="mb-2">
            <Link href={`/chat/${sessionId}`}>
              <div className="text-white text-xs truncate hover:underline">
                {title as string}
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MessageList;
