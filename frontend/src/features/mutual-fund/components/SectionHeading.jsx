import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

function SectionHeading({
  heading,
  subHeading,
  navigateTo,
  navState,
  className,
}) {
  return (
    <div
      className={cn(
        "Section-Heading mb-4 flex items-center justify-between px-4 sm:mb-4 sm:px-0",
        className,
      )}
    >
      <h2 className="font-medium sm:text-xl sm:font-semibold">{heading}</h2>
      <Link to={navigateTo || "#"} state={navState}>
        <h3 className="text-primary flex items-center text-[0.8rem] font-medium sm:text-base">
          {subHeading} {subHeading && <ChevronRightIcon className="size-4" />}
        </h3>
      </Link>
    </div>
  );
}

export default SectionHeading;
