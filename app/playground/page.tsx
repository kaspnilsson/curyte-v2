"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { promisifyLessonIdStream } from "@/lib/rpc/read-lesson-stream";
import {
  PlaygroundGenerationSchema,
  playgroundSchema,
} from "@/lib/validations/playground";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PageHeader } from "@/components/page-header";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";

const DEFAULT_CARD_DESCRIPTION =
  "Tell Curyte what to generate using a completely custom prompt.";

export default function Page() {
  const form = useForm<PlaygroundGenerationSchema>({
    resolver: zodResolver(playgroundSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [generationUpdate, setGenerationUpdate] = useState(
    "Getting creative..."
  );
  const [progress, setProgress] = useState(0);

  async function onSubmit({ query }: PlaygroundGenerationSchema) {
    try {
      setLoading(true);
      const response = await fetch("/api/playground", {
        method: "POST",
        body: JSON.stringify({ query: query.trim() }),
      });
      const lessonId = await promisifyLessonIdStream(
        response,
        (update, progress) => {
          setGenerationUpdate(update);
          setProgress(progress);
        }
      );
      if (!lessonId) {
        toast({
          title: "Error",
          description: "Something went wrong, please try again.",
        });
        setLoading(false);
        return;
      }
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
    <>
      <PageHeader
        title={"🛝 Playground"}
        description={DEFAULT_CARD_DESCRIPTION}
      />
      <Card>
        <CardContent className="grid gap-6 pt-6">
          {loading ? (
            <>
              <div>
                <Progress value={progress * 100} />
                <p className="mx-auto mt-1 w-fit text-sm italic text-muted-foreground">
                  {generationUpdate}
                </p>
              </div>
              <LessonSkeleton />
            </>
          ) : (
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={(...args) =>
                  void form.handleSubmit(onSubmit)(...args)
                }
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
    </>
  );
}
