"use client";
import { setCookie } from "cookies-next/client";
import { Ellipsis } from "lucide-react";

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
      <div onClick={handleClick} className="flex items-center">
        <div className="flex-grow mr-2 text-white text-xs truncate hover:underline cursor-pointer">
          {title}
        </div>
        <div className="flex-shrink-0">
          <Ellipsis size={15} className="text-white" />
        </div>
      </div>
    </li>
  );
};

export default SessionListItem;
