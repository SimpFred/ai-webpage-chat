import {
  AppWindowIcon,
  BotMessageSquare,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col h-full bg-zinc-900 text-zinc-200 items-center justify-center">
        <div className="text-center bg-zinc-900 p-8 ">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Välkommen till detta <br /> LLM Interface! 🤖
          </h1>
          <div className="inline-flex gap-4 w-full">
            <Link
              href="/web-page-chat"
              className="flex-1 mt-6 z-10 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col rounded-lg p-2 items-center justify-center hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              <div className="flex">
                <AppWindowIcon size={30} className="m-1 text-white" />
                <MessageSquare size={30} className="m-1 text-white" />
              </div>
              <p className="text-xs text-white">Chatta med en hemsida</p>
            </Link>
            <Link
              href="/chat"
              className="flex-1 mt-6 z-10 bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col rounded-lg p-2 items-center justify-center hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <div className="flex">
                <BotMessageSquare size={30} className="m-1 text-white" />
                <MessageSquare size={30} className="m-1 text-white" />
              </div>
              <p className="text-xs text-white">Vanlig LLM chat</p>
            </Link>
            <Link
              href="/upload-file"
              className="flex-1 mt-6 z-10 bg-gradient-to-r from-pink-500 to-blue-500 flex flex-col rounded-lg p-2 items-center justify-center hover:shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
            >
              <div className="flex">
                <FileText size={30} className="m-1 text-white" />
                <MessageSquare size={30} className="m-1 text-white" />
              </div>
              <p className="text-xs text-white">Chatta med ett pdf dokument</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
