"use client";
import React, { useRef, useState, useEffect } from "react";
import NewChat from "./newChat";
import SessionListItem from "./sessionListItem";

interface DraggableMenuProps {
  sessions: {
    sessionId: string;
    title: string;
    lastModified: number;
  }[];
}

const DraggableMenu = ({ sessions }: DraggableMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300); // Initial bredd på menyn
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && menuRef.current) {
        const newWidth =
          e.clientX - menuRef.current.getBoundingClientRect().left;
        setWidth(Math.max(200, Math.min(newWidth, 500)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault(); // Förhindra textmarkering
  };

  return (
    <div
      ref={menuRef}
      className="handle h-full z-index-1 bg-zinc-900 text-white p-4"
      style={{ width, position: "relative" }}
    >
      <NewChat />

      <ul className="mt-8">
        {sessions &&
          sessions.map(({ sessionId, title }) => (
            <SessionListItem
              key={sessionId}
              sessionId={sessionId}
              title={title}
            />
          ))}
      </ul>

      <div
        ref={handleRef}
        className="resize-handle"
        onMouseDown={handleMouseDown}
        style={{
          width: "10px",
          height: "100%",
          backgroundColor: "transparent",
          cursor: "ew-resize",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
    </div>
  );
};

export default DraggableMenu;
