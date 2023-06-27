import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
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
