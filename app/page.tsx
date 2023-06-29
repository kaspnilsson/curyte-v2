import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GenerateForm } from "@/components/forms/generate-form";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:px-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          🧠 Generate lessons with the power of AI
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Create engaging plans in minutes, so you can focus on the kids.
        </p>
      </div>
      <GenerateForm />
    </section>
  );
}
