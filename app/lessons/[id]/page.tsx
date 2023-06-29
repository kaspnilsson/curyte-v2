import ReactMarkdown from "react-markdown";

import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export const runtime = "edge";

async function getData(id: string) {
  return supabase.from("generated").select().eq("id", id);
}

export default async function Page({ params }: { params: { id: string } }) {
  const { data, error } = await getData(params.id);
  const lesson = data![0];
  return (
    <>
      <PageHeader
        title="✨ Generated lesson"
        description={`Generated with the instruction: \n${lesson.query}`}
      />
      <Card>
        <CardContent className="mt-6 grid gap-4">
          <ReactMarkdown className="prose prose-sm prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tighter">
            {lesson.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </>
  );
}
