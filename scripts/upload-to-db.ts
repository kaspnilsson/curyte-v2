/**
 * To run: `ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/upload-to-db.ts`
 */

import fs from "fs";
import path from "path";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import * as dotenv from "dotenv";
import { BaseDocumentLoader } from "langchain/dist/document_loaders/base";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { getStandardsIndex } from "../ai/pinecone";

const tf = require("@tensorflow/tfjs-node-gpu");

const FILE_DIR = "/var/folders/lr/8f3f9h252bd4hvdl8ywvlc6h0000gn/T75YwsW/";
const MAX_CONCURRENT_FILES = 25; // Set the maximum number of concurrent files to process

const splitter = new RecursiveCharacterTextSplitter();

function getLoaderFromPath(path: string): BaseDocumentLoader {
  if (path.includes(".pdf")) {
    return new PDFLoader(path, { splitPages: false });
  }
  if (path.includes(".docx")) {
    return new DocxLoader(path);
  }

  throw new Error("Unknown file type for path " + path);
}

async function loadFile(filePath: string, pineconeIndex: VectorOperationsApi) {
  try {
    const now = Date.now();
    console.log("loading text content from ", filePath);
    const loader = getLoaderFromPath(filePath);
    const docs = await loader.loadAndSplit(splitter);
    docs.forEach((doc) => {
      if (doc?.metadata?.pdf?.metadata) {
        delete doc.metadata.pdf.metadata;
      }
    });

    // TODO generate metadata
    // TODO maybe pre-process docs with AI?
    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        maxConcurrency: MAX_CONCURRENT_FILES,
        maxRetries: 10,
      }),
      // new TensorFlowEmbeddings(),
      {
        pineconeIndex,
      }
    );
    console.log(
      "embedded docs into pinecone for",
      filePath,
      "in",
      Date.now() - now,
      "ms"
    );

    // Write the file name to uploaded.txt
    fs.appendFileSync(path.join(FILE_DIR, "uploaded.txt"), `${filePath}\n`);
  } catch (e) {
    console.error("Error during loading for", filePath);
    console.error(e);

    // Write the file name to failed.txt
    fs.appendFileSync(path.join(FILE_DIR, "failed.txt"), `${filePath}\n`);
  }
}

async function loadAllFiles() {
  const loadingStart = Date.now();

  // Init pinecone
  console.log("initializing pinecone client");

  const pineconeIndex = await getStandardsIndex();

  // Get files
  console.log("reading files");
  const files = fs
    .readdirSync(FILE_DIR)
    .filter(
      (filename: string) =>
        filename.includes(".docx") || filename.includes(".pdf")
    );

  const filesQueue = [...files];
  const promises = [];
  for (let i = 0; i < MAX_CONCURRENT_FILES; i++) {
    promises.push(
      new Promise<void>(async (resolve) => {
        while (filesQueue.length) {
          const file = filesQueue.pop();
          if (file) {
            await loadFile(path.join(FILE_DIR, file), pineconeIndex);
          }
        }
        resolve();
      })
    );
  }

  await Promise.all(promises);

  console.log(
    "Loaded all",
    files.length,
    "files in",
    Date.now() - loadingStart,
    "ms"
  );
}

dotenv.config();

// Kick off the download process
loadAllFiles().catch(console.error);
