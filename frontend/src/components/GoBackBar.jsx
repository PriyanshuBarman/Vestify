import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function GoBackBar({ title, showSearchIcon = true, className }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-10 flex items-center p-4",
        className,
      )}
    >
      <Button
        aria-label="Go back button"
        size="icon-sm"
        onClick={() => navigate(-1)}
        className="bg-background text-foreground w-fit rounded-full hover:bg-transparent"
      >
        <ArrowLeftIcon className="size-6" />
      </Button>

      {title && <h1 className="ml-1 font-medium">{title}</h1>}

      {showSearchIcon && (
        <Button
          aria-label="search"
          variant="ghost"
          onClick={() => navigate("/search")}
          size="icon-sm"
          className="ml-auto min-[1100px]:hidden"
        >
          <SearchIcon className="size-5.5" />
        </Button>
      )}
    </div>
  );
}

export default GoBackBar;
