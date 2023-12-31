import {
  LLMChain,
  RetrievalQAChain,
  loadQAMapReduceChain,
  loadQARefineChain,
  loadQAStuffChain,
} from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import {
  activitiesPrompt,
  assessmentPrompt,
  differentiatePrompt,
  generatePlanBodyPrompt,
  identifyAndDefinePrompt,
  questionPrompt,
  refinePrompt,
  reflectPrompt,
  reflectPromptSimpleInput,
} from "./openai";
import { getStandardsIndex } from "./pinecone";

export async function querySimple(query: string) {
  console.time("Total runtime");
  const pineconeIndex = await getStandardsIndex();

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
  console.time("Total runtime");
  const pineconeIndex = await getStandardsIndex();

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
/**
 * A function that implements a lesson plan.
 *
 * Steps to create a lesson plan:
 * 1. Identify the relevant academic standards that your lesson should address, and clearly define your lesson's objectives and goals aligned with these standards.
 * 2. Design engaging instructional activities that both cater to diverse learning styles and scaffold learning, ensuring students can achieve the lesson's objectives.
 * 3. Develop formative assessments to measure student progress throughout the lesson, providing opportunities for real-time feedback and adjustments.
 * 4. Incorporate differentiated instruction techniques to meet the individual needs, abilities, and learning styles of all students, promoting inclusive learning.
 * 5. Reflect and adjust your lesson plan based on student performance data, feedback, and self-reflection, ensuring continuous improvement and standards alignment.
 */
export async function queryComplex(
  query: string,
  progressCallback: (message: string, progress: number) => void = () => null,
  intermediateContentCallback: (message: string) => void = () => null
) {
  console.time("Total runtime");
  const pineconeIndex = await getStandardsIndex();

  const chatOpenAi = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
  });
  // const openAi = new OpenAI({
  //   openAIApiKey: process.env.OPENAI_API_KEY!,
  // });

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  console.time("Identify / define call");
  progressCallback("Identifying the relevant academic standards...", 0.1);
  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(chatOpenAi, {
      prompt: identifyAndDefinePrompt,
    }),
    retriever: vectorStore.asRetriever(),
  });
  const identifyRes = await chain.call({ query, verbose: true });
  // console.log(identifyRes);
  console.timeEnd("Identify / define call");
  const standards = identifyRes.text;
  intermediateContentCallback(standards);

  // let progressSoFar = 0.1;
  // const [activitiesRes, assessmentRes, differentiateRes] = await Promise.all([
  //   (async () => {
  //     console.time("Design call");
  //     progressSoFar += 0.1;
  //     progressCallback("Designing activities plan...", progressSoFar);
  //     const activitiesChain = new LLMChain({
  //       llm: chatOpenAi,
  //       prompt: activitiesPrompt,
  //     });
  //     const res = await activitiesChain.call({
  //       verbose: true,
  //       standards,
  //       question: query,
  //     });
  //     // console.log(activitiesRes);
  //     console.timeEnd("Design call");
  //     return res;
  //   })(),
  //   (async () => {
  //     console.time("Assessment call");
  //     progressSoFar += 0.1;
  //     progressCallback("Developing formative assessments...", progressSoFar);
  //     const assessmentChain = new LLMChain({
  //       llm: chatOpenAi,
  //       prompt: assessmentPrompt,
  //     });
  //     const res = await assessmentChain.call({
  //       verbose: true,
  //       standards,
  //       activities,
  //       question: query,
  //     });
  //     // console.log(res);
  //     console.timeEnd("Assessment call");
  //     return res;
  //   })(),
  //   (async () => {
  //     console.time("Differentiate call");
  //     progressSoFar += 0.1;
  //     progressCallback(
  //       "Incorporating differentiated instruction techniques...",
  //       progressSoFar
  //     );
  //     const differentiateChain = new LLMChain({
  //       llm: chatOpenAi,
  //       prompt: differentiatePrompt,
  //     });
  //     const res = await differentiateChain.call({
  //       verbose: true,
  //       question: query,
  //       standards,
  //     });
  //     // console.log(res);
  //     console.timeEnd("Differentiate call");
  //     return res;
  //   })(),
  // ]);

  // const activities = activitiesRes.text;
  // const assessment = assessmentRes.text;
  // const differentiation = differentiateRes.text;

  console.time("Plan call");
  progressCallback("Creating engaging activities...", 0.5);
  const generatePlanChain = new LLMChain({
    llm: chatOpenAi,
    prompt: generatePlanBodyPrompt,
  });
  const generatePlanRes = await generatePlanChain.call({
    verbose: true,
    standards,
    question: query,
  });
  console.timeEnd("Plan call");
  const plan = generatePlanRes.text;
  intermediateContentCallback(plan);

  console.time("Reflect call");
  progressCallback("Reflecting and adjusting lesson plan...", 0.8);
  const reflectChain = new LLMChain({
    llm: chatOpenAi,
    // prompt: reflectPrompt,
    prompt: reflectPromptSimpleInput,
  });
  const reflectRes = await reflectChain.call({
    verbose: true,
    // assessment,
    // differentiation,
    // activities,
    plan,
    standards,
    question: query,
  });
  // console.log(reflectRes);
  console.timeEnd("Reflect call");

  // console.time("Formatting call");
  // progressCallback("Formatting lesson plan...", 0.9);
  // const formatChain = new LLMChain({
  //   llm: chatOpenAi,
  //   prompt: formatPrompt,
  // });
  // const formatRes = await formatChain.call({
  //   verbose: true,
  //   plan: reflectRes.text,
  // });
  // // console.log(formatRes);
  // console.timeEnd("Formatting call");

  console.timeEnd("Total runtime");
  return reflectRes.text;
}
