/**
 * To run: `ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/download-files.ts`
 */

import fs from "fs";
import http from "http";
import https from "https";
import os from "os";
import path from "path";
import url from "url";
import { promisify } from "util";
import * as dotenv from "dotenv";

const setTimeoutPromise = promisify(setTimeout);

interface Row {
  label: string;
  href: string;
}

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
async function downloadAllFiles() {
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
  const downloadPromises = Array.from(files).map((file) =>
    downloadFile(file, tempDir)
  );

  await Promise.all(downloadPromises);
  console.log(
    "Downloaded all",
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
