import { ServerRuntime } from "next";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export const runtime: ServerRuntime = "edge";

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;
  if (!id) {
    return new NextResponse(JSON.stringify({ error: "Invalid parameters" }), {
      status: 400,
    });
  }
  const res = await supabase.from("generated").delete().match({ id });
  return NextResponse.json(res);
}
