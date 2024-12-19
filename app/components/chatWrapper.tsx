"use client";
import { Message, useChat } from "ai/react";
import { Messages } from "./messages";
import { ChatInput } from "./chatInput";

const ChatWrapper = ({
  sessionId,
  initialMessages,
  apiURL,
}: {
  sessionId: string;
  initialMessages: Message[];
  apiURL: string;
}) => {
  const {
    messages,
    handleInputChange,
    input,
    handleSubmit,
    setInput,
    isLoading,
  } = useChat({
    api: apiURL,
    body: { sessionId },
    initialMessages,
  });

  return (
    <div
      className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700
    flex-col justify-between gap-2"
    >
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        <Messages messages={messages} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
        isAnswering={isLoading}
      />
    </div>
  );
};

export default ChatWrapper;
