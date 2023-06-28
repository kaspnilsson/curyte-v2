import { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { queryComplex } from "@/ai/query";

import { supabase } from "@/lib/supabase";
import { playgroundSchema } from "@/lib/validations/playground";

export const runtime: ServerRuntime = "edge";

export async function POST(request: Request) {
  console.time("POST request processing time");
  console.log("Got request:", JSON.stringify(request));

  // Validate the parameters
  let rawParams;
  try {
    rawParams = await request.json();
    playgroundSchema.parse(rawParams);
  } catch (error) {
    console.error("Invalid parameters:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid parameters" }), {
      status: 400,
    });
  }

  const { query } = rawParams;
  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      console.time("Fetching data and streaming time");

      try {
        // Fetch the data
        console.time("Query execution time");
        const content = await queryComplex(query, (message, progress) => {
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
        });
        console.timeEnd("Query execution time");

        console.time("Inserting data time");
        const { data, error } = await supabase
          .from("generated")
          .insert({ params: {}, query, content })
          .select();
        console.timeEnd("Inserting data time");

        // Handle errors
        if (error) {
          console.error("Error generating lesson plan:", error.message);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                status: "error",
                message: "Error generating lesson plan: " + error.message,
              })
            )
          );
          controller.close();
          return;
        }

        if (!data?.length) {
          console.error("Error generating lesson plan: No data");
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                status: "error",
                message: "Error generating lesson plan",
              })
            )
          );
          controller.close();
          return;
        }

        // Stream the final result
        controller.enqueue(
          encoder.encode(JSON.stringify({ status: "success", id: data[0].id }))
        );
        controller.close();
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
        controller.close();
      } finally {
        console.timeEnd("Fetching data and streaming time");
      }
    },
  });

  console.timeEnd("POST request processing time");

  return new Response(customReadable, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
