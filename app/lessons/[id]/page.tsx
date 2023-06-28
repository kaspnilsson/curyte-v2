import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { siteConfig } from "@/config/site";
import { supabase } from "@/lib/supabase";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { GenerateForm } from "@/components/forms/generate-form";

async function getData(id: string) {
  return supabase.from("generated").select().eq("id", id);
}

export default async function Page({ params }: { params: { id: string } }) {
  const { data, error } = await getData(params.id);
  const lesson = data![0];
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Generated lesson</CardTitle>
        <CardDescription>
          Generated with the instruction: {lesson.query}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6 grid gap-4">
        <ReactMarkdown className="prose prose-sm prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tighter">
          {lesson.content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}
