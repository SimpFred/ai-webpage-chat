"use client";

import { Button, Textarea } from "@nextui-org/react";
import { Send } from "lucide-react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  isAnswering: boolean;
}

export const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  setInput,
  isAnswering,
}: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-800 absolute border-none bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl ">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col ">
          <div className="relative flex flex-col w-full flex-grow pb-2">
            <form onSubmit={handleSubmit} className="relative w-[80%] mx-auto">
              <Textarea
                minRows={4}
                variant="faded"
                autoFocus
                disabled={isAnswering}
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    setInput("");
                  }
                }}
                placeholder={
                  isAnswering
                    ? "Generating response..."
                    : "Enter your question..."
                }
                className="resize-none bg-zinc-800 hover:bg-zinc-800 text-white rounded-xl text-base caret-slate-50"
              />
              <Button
                size="sm"
                disabled={isAnswering}
                isLoading={isAnswering}
                type="submit"
                className="absolute z-10 border border-border bg-zinc-900 right-2 bottom-2"
              >
                {!isAnswering && <Send className="size-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
