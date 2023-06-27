import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Loading...</CardTitle>
      </CardHeader>
      <CardContent>
        <LessonSkeleton />
      </CardContent>
    </Card>
  );
}
