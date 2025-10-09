import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { Spinner } from "./ui/spinner";

function LoadingState({ isLoading = true, fullPage, className = "" }) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "flex justify-center",
        fullPage && "h-dvh items-center",
        className,
      )}
    >
      {fullPage ? (
        // <Loader2Icon className="text-primary size-10 animate-spin" />
        <Spinner />
      ) : (
        <div className="bg-accent flex h-fit items-center gap-2 rounded-full px-4 py-1 text-xs font-[450] italic shadow sm:px-6 sm:py-2 sm:font-medium">
          <Loader2Icon className="size-4 animate-spin" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default LoadingState;
