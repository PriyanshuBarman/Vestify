import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function GoBackBar({ title, className }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-10 flex items-center justify-between p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        {title && <h1 className="font-medium">{title}</h1>}
      </div>
      <Button
        aria-label="search"
        variant="ghost"
        onClick={() => navigate("/search")}
        size="icon"
        className="min-[1100px]:hidden"
      >
        <SearchIcon className="size-5.5" />
      </Button>
    </div>
  );
}

export default GoBackBar;
