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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenerateForm } from "@/components/forms/generate-form";
import { Icons } from "@/components/icons";

async function getData() {
  return supabase.from("generated").select();
}

export default async function Page() {
  const { data, error } = await getData();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">All lessons</CardTitle>
          <CardDescription>Every lesson our AI has generated.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Grade level</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((lesson, index) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {lesson.params.subject || "No subject"}
                  </TableCell>
                  <TableCell>
                    {lesson.params.gradeLevel || "No grade level"}
                  </TableCell>
                  <TableCell>{lesson.params.topic || "No topic"}</TableCell>
                  <TableCell>
                    {new Date(lesson.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      View
                      <Icons.link className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}