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
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Card>
        <CardContent className="mt-6 grid gap-4">
          <ReactMarkdown className="prose prose-sm prose-stone max-w-none dark:prose-invert md:prose-base">
            {data![0].content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </section>
  );
}
