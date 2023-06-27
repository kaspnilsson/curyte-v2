import { NextResponse } from "next/server";
import { querySimple } from "@/ai/query";

import { supabase } from "@/lib/supabase";
import {
  LessonPlanGenerationSchema,
  generateLessonPlanStr,
} from "@/lib/validations/generate";

/**
 * TODO
 * - write this to a DB
 * - return the ID of the plan
 * - redirect user to the plan
 */
export async function POST(request: Request) {
  const params = (await request.json()) as LessonPlanGenerationSchema;
  const query = generateLessonPlanStr(params);
  const content = await querySimple(query);

  const { data, error } = await supabase
    .from("generated")
    .insert({ params, query, content })
    .select();

  if (error) {
    return NextResponse.json({
      error: "Error generating lesson plan: " + error.message,
    });
  }

  if (!data?.length) {
    return NextResponse.json({
      error: "Error generating lesson plan",
    });
  }

  return NextResponse.json({ id: data[0].id });
}
