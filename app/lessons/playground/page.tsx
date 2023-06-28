"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { siteConfig } from "@/config/site";
import { promisifyLessonIdStream } from "@/lib/rpc/read-lesson-stream";
import {
  PlaygroundGenerationSchema,
  playgroundSchema,
} from "@/lib/validations/playground";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { GenerateForm } from "@/components/forms/generate-form";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";

export default function Page() {
  const form = useForm<PlaygroundGenerationSchema>({
    resolver: zodResolver(playgroundSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit({ query }: PlaygroundGenerationSchema) {
    try {
      setLoading(true);
      const response = await fetch("/api/playground", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const lessonId = await promisifyLessonIdStream(response);
      router.push("/lessons/" + lessonId);
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again: " + e,
      });
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Playground</CardTitle>
        <CardDescription>
          Tell Curyte what to generate using a completely custom prompt.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? (
          <LessonSkeleton />
        ) : (
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Generate a lesson about trains"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Text will be sent to generation APIs in raw form.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>
                Generate
                <span className="sr-only">Generate</span>
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
