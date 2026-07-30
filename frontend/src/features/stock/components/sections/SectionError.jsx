import { RotateCwIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

function SectionError({ heading, error, refetch, isFetching }) {
  return (
    <section className="swiper-no-swiping  sm:m-0.5 sm:px-0 px-4">
      <SectionHeading heading={heading} className="p-0" />

      <div className="flex flex-col gap-4 h-91 sm:h-44  items-center justify-center">
        <h2 className="font-[450] sm:font-medium">
          {error?.response?.data?.message ??
            error?.message ??
            "Something went wrong"}
        </h2>
        <Button
          variant="secondary"
          onClick={refetch}
          className="px-4! rounded-full"
        >
          <RotateCwIcon
            className={cn("stroke-2", isFetching && "animate-spin")}
          />
          Retry
        </Button>
      </div>
    </section>
  );
}

export default SectionError;
