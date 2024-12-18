export default function Home() {
  return (
    <>
      <div className="p-6 flex flex-col h-full dark:bg-zinc-800 dark:text-zinc-200 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-2xl text-center bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Välkommen till AI Webpage Chat
          </h1>
          <p className="mb-4 text-lg">
            För att börja chatta med en hemsida, sätt den URL du vill chatta med
            direkt efter URL:en{" "}
            <code className="bg-zinc-700 p-1 rounded">localhost:3000/</code>.
          </p>
          <p className="mb-4 text-lg">
            Till exempel, för att chatta med{" "}
            <code className="bg-zinc-700 p-1 rounded">example.com</code>,
            navigera till{" "}
            <code className="bg-zinc-700 p-1 rounded">
              localhost:3000/example.com
            </code>
            .
          </p>
          <p className="mb-4 text-lg">
            När du har navigerat till rätt URL, kommer du att kunna ställa
            frågor och få svar från den specifika hemsidan.
          </p>
          <p className="mb-4 text-lg">
            Om du har några frågor eller behöver hjälp, tveka inte att kontakta
            oss.
          </p>
        </div>
      </div>
    </>
  );
}
