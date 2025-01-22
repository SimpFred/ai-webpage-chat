import { Bot, User } from "lucide-react";
import { cn } from "../../lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn({
        "bg-zink-800": isUserMessage,
        "bg-zink-900/25": !isUserMessage,
      })}
    >
      <div className={"p-6"}>
        <div className={"max-w-3xl mx-auto  flex items-start gap-2.5"}>
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </div>
          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 text-white">
                {isUserMessage ? "You" : "Website"}
              </span>
            </div>
            <div className="text-base font-normal py-4 px-6 text-gray-900 text-white leading-relaxed">
              <ReactMarkdown
                components={{
                  ul: ({ ...props }) => (
                    <ul className="list-disc ml-6" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal ml-6" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  code({
                    inline,
                    className,
                    children,
                    ...props
                  }: {
                    inline?: boolean;
                    className?: string;
                    children?: React.ReactNode;
                  }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <>
                        <div className="text-m bg-neutral-900 rounded-t-md mt-3 p-2">
                          {match[1]}
                        </div>

                        <SyntaxHighlighter
                          style={materialDark}
                          customStyle={{
                            marginTop: "0",
                            borderBottomLeftRadius: ".375rem",
                            borderBottomRightRadius: ".375rem",
                          }}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
