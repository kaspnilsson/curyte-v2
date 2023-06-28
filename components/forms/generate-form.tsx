"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { promisifyLessonIdStream } from "@/lib/rpc/read-lesson-stream";
import {
  LessonPlanGenerationSchema,
  generateSchema,
} from "@/lib/validations/generate";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import LessonSkeleton from "../skeletons/lesson-skeleton";

const SUBJECTS = [
  "Arts and music",
  "English language arts",
  "Foreign languages",
  "Holidays / seasonal",
  "Math",
  "Science / technology",
  "Social studies / history",
  "Special education",
];

const GRADE_LEVELS = [
  "Pre-K",
  "Kindergarten",
  "1st grade",
  "2nd grade",
  "3rd grade",
  "4th grade",
  "5th grade",
  "6th grade",
  "7th grade",
  "8th grade",
  "9th grade",
  "10th grade",
  "11th grade",
  "12th grade",
  "College+",
];

const DEFAULT_GENERATION_UPDATE =
  "Our AI is hard at work, but this may take up to 5 minutes.";

export function GenerateForm() {
  const form = useForm<LessonPlanGenerationSchema>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      topic: "",
      stateLocale: "",
      lessonStandard: "",
      keywords: "",
      hasQuiz: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [generationUpdate, setGenerationUpdate] = useState(
    DEFAULT_GENERATION_UPDATE
  );
  const [progress, setProgress] = useState(0);

  async function onSubmit(data: LessonPlanGenerationSchema) {
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(data),
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
      console.error(e);
      setLoading(false);
    } finally {
      setGenerationUpdate(DEFAULT_GENERATION_UPDATE);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Generating...</CardTitle>
          <CardDescription>{DEFAULT_GENERATION_UPDATE}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Progress value={progress * 100} />
            <p className="mx-auto mt-1 w-fit text-sm text-muted-foreground">
              {generationUpdate}
            </p>
          </div>
          <LessonSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Generate</CardTitle>
        <CardDescription>Tell Curyte what to generate.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Science" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SUBJECTS.map((subject, index) => (
                          <SelectItem key={index} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="9th grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GRADE_LEVELS.map((gradeLevel, index) => (
                          <SelectItem key={index} value={gradeLevel}>
                            {gradeLevel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Electricity and magnetism" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stateLocale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State / locale</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Edison, alternating current, fields"
                      {...field}
                    />
                  </FormControl>
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
      </CardContent>
    </Card>
  );
}
