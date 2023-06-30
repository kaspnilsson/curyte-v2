import { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { queryComplex } from "@/ai/query";

import { supabase } from "@/lib/supabase";
import {
  LessonPlanGenerationSchema,
  generateLessonPlanStr,
  generateSchema,
} from "@/lib/validations/generate";

export const runtime: ServerRuntime = "edge";

export async function POST(request: Request) {
  console.time("POST request processing time");

  // Validate the parameters
  let params: LessonPlanGenerationSchema | null = null;
  let query = "";
  try {
    const rawParams = await request.json();
    params = generateSchema.parse(rawParams);

    query = generateLessonPlanStr(params);
  } catch (error) {
    console.error("Invalid parameters:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid parameters" }), {
      status: 400,
    });
  }

  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      console.time("Fetching data and streaming time");

      const now = Date.now();
      function handleError(error: string) {
        console.error("Error generating lesson plan:", error);
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              status: "error",
              message: "Error generating lesson plan: " + error,
            })
          )
        );
        controller.close();
      }

      try {
        // Fetch the data
        console.time("Query execution time");
        let intermediates: string[] = [];
        const content = await queryComplex(
          query,
          (message, progress) => {
            console.log("Got progress update:", message, progress);
            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  status: "in-progress",
                  message,
                  progress,
                })
              )
            );
          },
          (content) => {
            intermediates.push(content);
          }
        );
        console.timeEnd("Query execution time");

        let { data, error } = await supabase
          .from("generated")
          .insert({
            params,
            query,
            content,
            intermediate_generations: intermediates,
            generation_time_ms: Date.now() - now,
          })
          .select();

        // Handle errors
        if (error) {
          handleError(error.message);
          return;
        }

        if (!data?.length) {
          handleError("No data returned");
          return;
        }

        // Stream the final result
        controller.enqueue(
          encoder.encode(JSON.stringify({ status: "success", id: data[0].id }))
        );
      } catch (error: unknown) {
        // Note the type assertion here
        console.error("Unexpected error:", error);
        let errorMessage = "Unexpected error occurred";

        if (error instanceof Error) {
          errorMessage += ": " + error.message;
        }

        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              status: "error",
              message: errorMessage,
            })
          )
        );
      } finally {
        controller.close();
        console.timeEnd("Fetching data and streaming time");
      }
    },
  });

  console.timeEnd("POST request processing time");

  return new Response(customReadable, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
