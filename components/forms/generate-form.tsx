"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { toast } from "sonner";
import type { z } from "zod";

import {
  LessonPlanGenerationSchema,
  generateSchema,
} from "@/lib/validations/generate";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { OAuthSignIn } from "../auth/oauth-signin";
import { Icons } from "../icons";
import { PasswordInput } from "../password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { SignInForm } from "./signin-form";

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
  //   const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  async function onSubmit(data: LessonPlanGenerationSchema) {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());
      setContent(res.content);
    } catch (e) {
      toast.error("Something went wrong, please try again: " + e);
    } finally {
      setLoading(false);
    }
  }

  if (content) {
    return (
      <Card>
        <CardContent className="mt-6 grid gap-4">
          <ReactMarkdown className="prose prose-sm prose-stone max-w-none dark:prose-invert md:prose-base">
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Generating...</CardTitle>
          <CardDescription>
            Our AI is hard at work, but this may take up to 5 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Skeleton className="h-16 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <Skeleton className="mt-8 h-8 w-[60%]" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
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
            {/* <FormField
          control={form.control}
          name="lessonStandard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson standard</FormLabel>
              <FormControl>
                <Input placeholder="E.g. 'Texas'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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