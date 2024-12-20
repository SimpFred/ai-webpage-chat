"use client";
import { setCookie } from "cookies-next/client";

interface SessionListItemProps {
  sessionId: string;
  title: string;
}

const SessionListItem = ({ sessionId, title }: SessionListItemProps) => {
  const handleClick = async () => {
    setCookie("sessionId", sessionId);
    window.location.reload();
  };

  return (
    <li className="mb-4">
      <div onClick={handleClick}>
        <div className="text-white text-xs truncate hover:underline">
          {title}
        </div>
      </div>
    </li>
  );
};

export default SessionListItem;
