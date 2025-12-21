import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function GoBackBtn({ className, ...props }) {
  const navigate = useNavigate();

  return (
    <Button
      aria-label="Go back button"
      size="icon-sm"
      onClick={() => navigate(-1)}
      className={cn(
        "bg-background text-foreground w-fit rounded-full hover:bg-transparent",
        className,
      )}
      {...props}
    >
      <ArrowLeftIcon className="size-6" />
    </Button>
  );
}

export default GoBackBtn;
