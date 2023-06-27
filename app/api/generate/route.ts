import { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { querySimple } from "@/ai/query";

import { supabase } from "@/lib/supabase";
import {
  generateLessonPlanStr,
  generateSchema,
} from "@/lib/validations/generate";

export const runtime: ServerRuntime = "edge";

export async function POST(request: Request) {
  const startTime = Date.now();
  console.log(
    `[INFO] Processing request started at ${new Date(startTime).toISOString()}`
  );

  try {
    const rawParams = await request.json();

    // Validate input parameters
    const params = generateSchema.parse(rawParams);
    console.log("[INFO] Input parameters validated successfully");

    const query = generateLessonPlanStr(params);
    const queryStartTime = Date.now();

    // Fetch the data
    const content = await querySimple(query);
    console.log(`[INFO] Query executed in ${Date.now() - queryStartTime}ms`);

    const insertStartTime = Date.now();
    const { data, error } = await supabase
      .from("generated")
      .insert({ params, query, content })
      .select();
    console.log(
      `[INFO] Data insertion executed in ${Date.now() - insertStartTime}ms`
    );

    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        // Provide an initial response
        controller.enqueue(encoder.encode("Fetching lesson plan..."));

        // Handle errors
        if (error) {
          console.error(
            `[ERROR] Error generating lesson plan: ${error.message}`
          );
          controller.enqueue(
            encoder.encode(`Error generating lesson plan: ${error.message}`)
          );
          controller.close();
          return;
        }

        if (!data?.length) {
          console.error(
            "[ERROR] Error generating lesson plan: No data returned"
          );
          controller.enqueue(encoder.encode("Error generating lesson plan"));
          controller.close();
          return;
        }

        // Stream the result
        controller.enqueue(encoder.encode(JSON.stringify({ id: data[0].id })));
        controller.close();
      },
    });

    console.log(`[INFO] Request processed in ${Date.now() - startTime}ms`);

    return new Response(customReadable, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (error) {
    console.error(
      `[ERROR] An error occurred while processing the request: ${error}`
    );
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }
}
