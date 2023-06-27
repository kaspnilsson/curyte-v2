import * as z from "zod";

export const generateSchema = z.object({
  topic: z.string(),
  subject: z.string(),
  stateLocale: z.string().optional(),
  gradeLevel: z.string().optional(),
  lessonStandard: z.string().optional(),
  keywords: z.string().optional(),
  hasQuiz: z.boolean().optional(),
});

export type LessonPlanGenerationSchema = z.infer<typeof generateSchema>;

export const generateLessonPlanStr = (
  input: LessonPlanGenerationSchema
): string => {
  let str = `Generate a lesson plan for a ${
    input.gradeLevel ? `Grade ${input.gradeLevel} ` : ""
  }${input.subject} class.`;

  if (input.lessonStandard) {
    str += ` The lesson must focus on the standard ${input.lessonStandard}, which requires students to ${input.topic}.`;
  }

  if (input.keywords) {
    str += ` The lesson should also attempt to cover the following subjects: ${input.keywords}.`;
  }

  if (input.hasQuiz !== undefined) {
    str += ` The lesson ${input.hasQuiz ? "must" : "must not"} include a quiz.`;
  }

  return str;
};
