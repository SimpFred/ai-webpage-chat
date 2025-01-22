const WebPageChat = () => {
  return (
    <div className="p-20 flex flex-col h-full bg-zinc-900 text-zinc-200 items-center justify-center">
      <div className="text-center bg-white bg-zinc-900">
        <p className="mb-4 text-lg">
          För att börja chatta med en hemsida, sätt den URL du vill chatta med
          direkt efter URL:en{" "}
          <code className="bg-zinc-700 p-1 rounded">localhost:3000/</code>.
        </p>
        <p className="mb-4 text-lg">
          Till exempel, för att chatta med{" "}
          <code className="bg-zinc-700 p-1 rounded">example.com</code>, navigera
          till{" "}
          <code className="bg-zinc-700 p-1 rounded">
            localhost:3000/example.com
          </code>
          .
        </p>
        <p className="mb-4 text-lg">
          När du har navigerat till rätt URL, kommer du att kunna ställa frågor
          och få svar från den specifika hemsidan.
        </p>
      </div>
    </div>
  );
};

export default WebPageChat;
