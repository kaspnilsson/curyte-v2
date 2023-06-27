import {
  RetrievalQAChain,
  loadQARefineChain,
  loadQAStuffChain,
} from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { questionPrompt, refinePrompt } from "./openai";
import { getStandardsIndex } from "./pinecone";

export async function querySimple(query: string) {
  const pineconeIndex = await getStandardsIndex();
  console.time("Total runtime");
  console.time("Pinecone Initialization");

  console.timeEnd("Pinecone Initialization");

  console.time("PineconeStore Retrieval");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  console.timeEnd("PineconeStore Retrieval");

  console.time("Chain Creation and Call");
  const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY! });
  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model, { prompt: questionPrompt }),
    retriever: vectorStore.asRetriever(),
  });
  const res = await chain.call({ query });
  console.timeEnd("Chain Creation and Call");
  console.timeEnd("Total runtime");

  return res.text;
}

export async function queryQA(query: string) {
  const pineconeIndex = await getStandardsIndex();
  console.time("Total runtime");
  console.time("Pinecone Initialization");

  console.timeEnd("Pinecone Initialization");

  console.time("PineconeStore Retrieval");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  console.timeEnd("PineconeStore Retrieval");

  console.time("Chain Creation and Call");
  const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY! });
  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQARefineChain(model, {
      questionPrompt,
      refinePrompt,
      verbose: true,
    }),
    retriever: vectorStore.asRetriever(),
  });
  const res = await chain.call({ query });
  console.timeEnd("Chain Creation and Call");
  console.timeEnd("Total runtime");

  return res.output_text;
}
