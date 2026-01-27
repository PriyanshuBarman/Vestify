import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function UserPreviewCardSkeleton() {
  return (
    <div className="bg-card rounded-3xl border p-4 sm:p-6">
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Avatar skeleton */}
        <Skeleton className="size-10 rounded-full sm:size-12" />

        <div className="flex-1 space-y-2">
          {/* Name skeleton */}
          <Skeleton className="h-5 w-32" />
          {/* Username skeleton */}
          <Skeleton className="h-3.5 w-24" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t pt-3 sm:pt-4">
        <div className="flex text-[0.8rem]">
          <div className="flex items-center gap-2">
            {/* Funds label */}
            <Skeleton className="h-4 w-13" />
            {/* Funds value */}
            {/* <Skeleton className="h-4 w-4" /> */}
          </div>
          <Separator
            orientation="vertical"
            className="bg-muted-foreground/70 mx-2 rotate-15 data-[orientation=vertical]:h-6 sm:mx-3"
          />
          <div className="flex items-center gap-2">
            {/* SIPs label */}
            <Skeleton className="h-4 w-13" />
            {/* SIPs value */}
            {/* <Skeleton className="h-4 w-4" /> */}
          </div>
        </div>
        <div className="ml-auto space-x-2">
          {/* Invested label */}
          <Skeleton className="inline-block h-3 w-16" />
          {/* Invested amount */}
          <Skeleton className="inline-block h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export default UserPreviewCardSkeleton;
