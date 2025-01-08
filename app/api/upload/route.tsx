import { NextResponse } from "next/server";
import busboy from "busboy";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "/uploads");

export const config = {
  api: {
    bodyParser: false, // Vi inaktiverar body-parser för att hantera uppladdning manuellt
  },
};

export async function POST(req: Request) {
  // Kontrollera att uppladdningsmappen finns
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const headers = Object.fromEntries(req.headers);
  const contentType = headers["content-type"] || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  return new Promise((resolve, reject) => {
    const bb = busboy({ headers });

    let filePath = "";

    bb.on("file", (fieldname, file, info) => {
      const { filename } = info;
      filePath = path.join(uploadDir, filename);
      const writeStream = fs.createWriteStream(filePath);
      file.pipe(writeStream);
    });

    bb.on("finish", () => {
      resolve(NextResponse.json({ filePath }, { status: 200 }));
    });

    bb.on("error", (err) => {
      reject(
        NextResponse.json(
          { error: "Error uploading file", details: (err as Error).message },
          { status: 500 }
        )
      );
    });

    // Läs kroppens data och skicka till Busboy
    req.body
      ?.getReader()
      .read()
      .then(({ value }) => {
        if (value) {
          bb.end(value);
        } else {
          reject(
            NextResponse.json({ error: "No file uploaded" }, { status: 400 })
          );
        }
      })
      .catch((err) => {
        reject(
          NextResponse.json(
            { error: "Error reading request body", details: err.message },
            { status: 500 }
          )
        );
      });
  });
}
