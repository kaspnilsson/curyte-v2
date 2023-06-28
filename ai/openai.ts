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
  If the context isn't useful, return the original answer in its original form with no clarifications or additional notes. Output must be in markdown.`);

export const identifyAndDefinePrompt = PromptTemplate.fromTemplate(
  `You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Given the following lesson plan idea, identify the most relevant academic standards that your lesson should address, and clearly define your lesson's objectives and goals aligned with these standards. If no standards are highly relevant, do not reference them, but do continue with the task.
  
  {question}`
);

export const designPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Using the objectives and standards, design the lesson plan, and add into the lesson plan three activities that both cater to diverse learning styles and scaffold learning, ensuring students can achieve the lesson's objectives.
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
`);

export const assessmentPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds. Generate one assessment for this plan with five questions that can be used to measure student progress throughout the lesson, providing opportunities for real-time feedback and adjustments. Provide a sample answer key for the assessment. Return the entire lesson plan in markdown.
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
----
Plan:
{plan}
`);

export const differentiatePrompt = PromptTemplate.fromTemplate(`
Suggest for the existing lesson plan differentiated instruction techniques to meet the individual needs, abilities, and learning styles of all students, promoting inclusive learning, and return the entire lesson plan.
----
Lesson plan idea: {question}
----
Plan:
{plan}
`);

export const reflectPrompt = PromptTemplate.fromTemplate(`
You are a wonderful, creative, engaging teacher who prioritizes students from diverse backgrounds.

A completed lesson plan has at least these five sections, but may have more if needed:
- Objectives and Standards: outlines the learning goals for the lesson and ties them directly to the appropriate educational standards. No more than one sentence for each.

- Materials and Resources: briefly lists all the necessary supplies, textbooks, technology, and any other resources needed to successfully carry out the lesson. No more than one sentence for each.

- Instructional Procedures: details the teaching methods, activities, discussions, and interactive elements that will be utilized to reach the lesson's objectives.

- Assessments: This section includes formative and summative assessments used to measure student learning and check for understanding, which should directly assess the stated objectives and standards. There should also be a short sample answer for each question.

- Differentiation and Adaptations: This part describes how the lesson will be modified or adapted to meet the diverse learning needs of all students, including those with special needs or those who are gifted and talented.

Using the below context, assemble and return the completed lesson plan. 
----
Lesson plan idea: {question}
----
Standards & objectives:
{standards}
----
Plan content:
{plan}
----
Assessment:
{assessment}
----
Differentiation:
{differentiation}
----
Ensure the content is sufficiently explained for the audience. Output must be a completed lesson plan, and must be in markdown!
`);
