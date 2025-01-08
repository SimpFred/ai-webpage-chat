"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("Uploading file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("res", res);
      if (res.ok) {
        const data = await res.json();
        const filePath = data.filePath;
        console.log("File uploaded to:", filePath);
        router.push(`/pdf-chat?file=${encodeURIComponent(filePath)}`);
      } else {
        console.error("File upload failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
      <div className="max-w-md w-full bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-6 text-center font-semibold">
          Välj en PDF-fil
        </h1>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-500"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
        >
          Ladda upp
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
