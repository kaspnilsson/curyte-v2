import { Skeleton } from "@/components/ui/skeleton";

export default function LessonSkeleton() {
  return (
    <div className="grid gap-4">
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
    </div>
  );
}
