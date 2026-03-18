import { Skeleton } from "@/components/ui/skeleton";

function UserPreviewCardSkeleton() {
  return (
    <div className="bg-card rounded-4xl border">
      <div className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
        {/* Avatar skeleton */}
        <Skeleton className="size-11 rounded-full sm:size-12" />

        <div className="flex-1 space-y-2">
          {/* Name skeleton */}
          <Skeleton className="h-5 w-32" />
          {/* Username skeleton */}
          <Skeleton className="h-3.5 w-24" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>

      <Skeleton className="bg-accent/80 mx-2 mb-2 h-15 rounded-3xl" />
    </div>
  );
}

export default UserPreviewCardSkeleton;
