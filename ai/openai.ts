import { PromptTemplate } from "langchain/prompts";

export const questionPrompt =
  PromptTemplate.fromTemplate(`You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Achieve the following task by outputting an appropriate, standards-aligned lesson, and ensure that the content is sufficiently explained for the audience. Output must be in markdown.

{question}`);

export const refinePrompt =
  PromptTemplate.fromTemplate(`The original question is as follows: {question}
  We have provided an existing answer: {existing_answer}
  We have the opportunity to refine the existing answer
  (only if needed) with some more context below.
  ----
  {context}
  ----
  Given the new context, refine the original answer to better answer the question. 
  If the context isn't useful, return the original answer in its original form with no clarifications or additional notes.`);

export const identifyAndDefinePrompt = PromptTemplate.fromTemplate(
  `You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Given the following lesson plan idea, identify the most relevant academic standards that your lesson should address, and clearly define your lesson's objectives and goals aligned with these standards. If no standards are highly relevant, do not reference them, but do continue with the task.
  
  {question}`
);

export const activitiesPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Using the objectives and standards, create three activities that both cater to diverse learning styles and scaffold learning, ensuring students can achieve the lesson's objectives.
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
`);

export const assessmentPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Generate one assessment for this plan with three questions that can be used to measure student progress throughout the lesson, providing opportunities for real-time feedback and adjustments. Provide a sample answer key for the assessment.
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
`);

export const differentiatePrompt = PromptTemplate.fromTemplate(`
Explain how the lesson could be modified or adapted to meet the diverse learning needs of all students, including those with special needs or those who are gifted and talented.
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
`);

export const reflectPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. You are creating a lesson plan.

A completed lesson plan is defined as:
- A title
- A table with the grade level, subject, and relevant academic standards.
- A section called "Learning objectives" that details the lesson's objectives and goals aligned with these standards
- A section called "Materials and resources" that details the teaching methods, activities, discussions, and interactive elements that will be utilized to reach the lesson's objectives
- A section called "Instructional procedures" that details the lesson's activities, including the time allotted for each activity
- A section called "Assessment" with three questions that can be used to measure student progress throughout the lesson, and a sample answer key
- A section called "Differentiation and adaptations" that explains how the lesson could be modified or adapted to meet the diverse learning needs of all students, including those with special needs or those who are gifted and talented.

Using the below context, assemble and return the completed lesson plan. Ensure the content is sufficiently explained for the audience. Output MUST be a completed lesson plan. Format using markdown.
----
Lesson plan idea:
{question}
----
Standards & objectives:
{standards}
----
Activities:
{activities}
----
Assessment:
{assessment}
----
Differentiation:
{differentiation}
`);
