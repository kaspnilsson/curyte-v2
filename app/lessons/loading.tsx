import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";

export default function Loading() {
  return (
    <>
      <PageHeader title="🕣 Loading" description="Fetching data..." />
      <Card>
        <CardContent className="pt-6">
          <LessonSkeleton />
        </CardContent>
      </Card>
    </>
  );
}
