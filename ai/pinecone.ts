import { PineconeClient } from "@pinecone-database/pinecone";

export async function getStandardsIndex() {
  const pinecone = new PineconeClient();

  await pinecone.init({
    environment: process.env.PINECONE_API_ENV!,
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pinecone.Index(process.env.PINECONE_INDEX!);
}
