import clsx from "clsx";
import { StarIcon } from "lucide-react";

function FundRating({ rating, className = "" }) {
  if (!rating) return null;

  return (
    <span className={clsx("flex items-center gap-0.5 whitespace-pre", className)}>
      {rating}
      <StarIcon className="fill-muted-foreground text-muted-foreground size-2.5" />
    </span>
  );
}

export default FundRating;
