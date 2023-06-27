import { NextResponse } from "next/server";
import { getStandardsIndex } from "@/ai/pinecone";
import { query } from "@/ai/query";

import {
  LessonPlanGenerationSchema,
  generateLessonPlanStr,
} from "@/lib/validations/generate";

export async function POST(request: Request) {
  const pineconeIndex = await getStandardsIndex();
  const body = (await request.json()) as LessonPlanGenerationSchema;
  const queryStr = generateLessonPlanStr(body);
  console.log("queryStr", queryStr);
  const out = await query(queryStr);
  return NextResponse.json({ markdown: out });
}
