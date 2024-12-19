import { Button } from "@nextui-org/react";
import {
  AppWindowIcon,
  BotMessageSquare,
  LayoutTemplate,
  MessageSquare,
  MessageSquareCode,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col h-full dark:bg-zinc-900 dark:text-zinc-200 items-center justify-center">
        <div className="text-center bg-white dark:bg-zinc-900 p-8 ">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Välkommen till detta <br /> LLM Interface! 🤖
          </h1>
          <div className="inline-flex gap-4">
            <Link
              href="/web-page-chat"
              className="w-fit mt-6 z-10 bg-zinc-900 flex flex-col border-2 border-border dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 rounded-lg p-2 items-center justify-center mx-auto"
            >
              <div className="flex">
                <AppWindowIcon size={30} className="m-1 text-blue-500" />
                <MessageSquare size={30} className="m-1 text-blue-500" />
              </div>

              <p className=" text-xs">Chatta med en hemsida</p>
            </Link>
            <Link
              href="/chat"
              className="w-fit mt-6 z-10 bg-zinc-900 flex flex-col border-2 border-border dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 rounded-lg p-2 items-center justify-center mx-auto"
            >
              <div className="flex">
                <BotMessageSquare size={30} className="m-1 text-purple-600" />
                <MessageSquare size={30} className="m-1 text-purple-600" />
              </div>

              <p className=" text-xs">Vanlig LLM chat</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
