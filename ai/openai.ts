import { PromptTemplate } from "langchain/prompts";

export const questionPrompt =
  PromptTemplate.fromTemplate(`You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Achieve the following task by outputting an appropriate, standards-aligned lesson. Output must be in markdown.

{question}`);

export const refinePrompt =
  PromptTemplate.fromTemplate(`The original question is as follows: {question}
  We have provided an existing answer: {existing_answer}
  We have the opportunity to refine the existing answer
  (only if needed) with some more context below.
  ------------
  {context}
  ------------
  Given the new context, refine the original answer to better answer the question. 
  If the context isn't useful, return the original answer in its original form. Output must be in markdown.`);
