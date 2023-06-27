"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
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

import { Icons } from "../icons";
import { PasswordInput } from "../password-input";

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
  });
  //   const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  function onSubmit(data: LessonPlanGenerationSchema) {
    console.log(data);
    // if (!isLoaded) return;
    startTransition(async () => {
      fetch("/api/generate", { method: "POST", body: JSON.stringify(data) });
    });
  }

  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Science" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SUBJECTS.map((subject) => (
                    <SelectItem value={subject}>{subject}</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="9th grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GRADE_LEVELS.map((gradeLevel) => (
                    <SelectItem value={gradeLevel}>{gradeLevel}</SelectItem>
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
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Generate
          <span className="sr-only">Generate</span>
        </Button>
      </form>
    </Form>
  );
}
