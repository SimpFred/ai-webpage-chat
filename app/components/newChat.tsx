"use client";

import { SquarePen } from "lucide-react";

const NewChat = () => {
  const handleNewSession = async () => {
    try {
      /*   // Ta bort befintligt sessionId-cookie
      document.cookie = "sessionId=; path=/; max-age=0"; */

      // Skicka en förfrågan för att trigga middleware att skapa ett nytt sessionId
      await fetch("/api/new-session", { method: "POST" });

      window.location.reload();

      // Om du vill, uppdatera UI eller logga resultatet
      console.log("New session created!");
    } catch (error) {
      console.error("Error creating new session:", error);
    }
  };
  return (
    <div className="flex items-center">
      <SquarePen size={20} className="ml-auto" onClick={handleNewSession} />
    </div>
  );
};

export default NewChat;
