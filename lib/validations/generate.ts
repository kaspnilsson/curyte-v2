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

export const generateLessonPlanStr = ({
  topic,
  subject,
  stateLocale,
  gradeLevel,
  lessonStandard,
  keywords,
  hasQuiz,
}: LessonPlanGenerationSchema): string => {
  let str = `Generate a lesson plan about ${topic} for a ${
    gradeLevel ? `${gradeLevel} ` : ""
  }${subject} class.`;

  if (lessonStandard) {
    str += ` The lesson must focus on the standard ${lessonStandard}.`;
  }

  if (stateLocale) {
    str += ` The lesson should prioritize content from ${stateLocale} if it exists.`;
  }

  if (keywords) {
    str += ` The teacher provided these additional keywords as context: ${keywords}.`;
  }

  if (hasQuiz !== undefined) {
    str += ` The lesson ${hasQuiz ? "must" : "must not"} include a quiz.`;
  }

  return str;
};
