import { GenerateForm } from "@/components/forms/generate-form";
import { PageHeader } from "@/components/page-header";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:px-8 md:py-10">
      <PageHeader
        title={"🧠 Generate lessons with the power of AI"}
        description={
          "Create engaging plans in minutes, so you can focus on the kids."
        }
      />
      <GenerateForm />
    </section>
  );
}
