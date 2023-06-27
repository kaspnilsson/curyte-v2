/**
 * To run: `ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/upload-to-db.ts`
 */

import fs from "fs";
import http from "http";
import https from "https";
import os from "os";
import path from "path";
import url from "url";
import { promisify } from "util";
import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import * as dotenv from "dotenv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { getStandardsIndex } from "../ai/pinecone";

interface Row {
  label: string;
  href: string;
}

const splitter = new RecursiveCharacterTextSplitter();

const setTimeoutPromise = promisify(setTimeout);

async function downloadFile(
  fileUrl: string,
  outputDir: string,
  timeoutDurationMs = 600_000
) {
  return new Promise<string>((resolve, reject) => {
    const now = Date.now();
    // Parse the filename from the URL
    const parsedUrl = new url.URL(fileUrl);
    const filename = path.basename(parsedUrl.pathname);

    // Create a writable stream for the file in the output directory
    const outputPath = path.join(outputDir, filename);

    // Check if the file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`File ${filename} already exists, skipping download`);
      resolve(outputPath);
      return;
    }

    const fileStream = fs.createWriteStream(outputPath);

    const get = fileUrl.startsWith("https:") ? https.get : http.get;

    get(fileUrl, (response) => {
      response.pipe(fileStream);
      fileStream.on("finish", () => {
        console.log(
          "Finished downloading",
          outputPath,
          "in",
          Date.now() - now,
          "ms"
        );
        resolve(outputPath);
      });
      fileStream.on("error", reject);
    }).on("error", reject); // Catch network errors

    // Timeout
    setTimeoutPromise(timeoutDurationMs).then(() => {
      reject(
        new Error(
          `Download of ${outputPath} timed out after ${timeoutDurationMs} ms`
        )
      );
    });
  });
}

async function loadFile(path: string, pineconeIndex: VectorOperationsApi) {
  try {
    const now = Date.now();
    console.log("loading text content from ", path);
    const loader = new PDFLoader(path, { splitPages: false });
    const docs = await loader.loadAndSplit(splitter);
    console.log("split", path, "into docs");

    // TODO generate metadata
    // TODO trim metadata from pdf subdir
    // TODO maybe pre-process docs with AI?
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });
    console.log(
      "embedded docs into pinecone for",
      path,
      "in",
      Date.now() - now,
      "ms"
    );
  } catch (e) {
    console.error("Error during loading for", path);
    console.error(e);
  }
}

async function downloadAllFiles() {
  // Init pinecone
  console.log("initializing pinecone client");

  const pineconeIndex = await getStandardsIndex();

  const files: Set<string> = new Set();

  // Get files
  console.log("reading files");
  fs.readdirSync(path.join(__dirname, "../data"))
    .filter((filename: string) => filename.endsWith(".json"))
    .forEach(async (filename: string) => {
      const filepath = path.join(__dirname, "../data", filename);
      const file = fs.readFileSync(filepath, "utf8");

      // Skip if file is empty
      if (file === "") {
        console.log(`Skipping ${filename} because it is empty.`);
        return;
      }

      for (const { label, href } of JSON.parse(file) as Row[]) {
        files.add(href);
      }
    });

  // Create a temporary directory
  const tempDir = fs.mkdtempSync(os.tmpdir());
  const loadingStart = Date.now();
  // Download all files
  const downloadPromises = Array.from(files).map(
    (file) => downloadFile(file, tempDir)
    // .then((path) => loadFile(path, pineconeIndex))
  );

  await Promise.all(downloadPromises);
  console.log(
    "Loaded all",
    downloadPromises.length,
    "files in",
    Date.now() - loadingStart,
    "ms"
  );

  console.log("Files available at ", tempDir);

  // // After you're done with the files, clean up the directory
  // fs.readdirSync(tempDir).forEach((file) => {
  //   fs.unlinkSync(path.join(tempDir, file));
  // });
  // fs.rmdirSync(tempDir);
  // console.log("Temporary directory has been cleaned up");
}

dotenv.config();

// Kick off the download process
downloadAllFiles().catch(console.error);
