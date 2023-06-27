import * as z from "zod";

export const playgroundSchema = z.object({
  query: z.string(),
});

export type PlaygroundGenerationSchema = z.infer<typeof playgroundSchema>;
