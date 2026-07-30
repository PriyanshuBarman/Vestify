import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

function GoBackButton({ className, ...props }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      aria-label="Go back button"
      size="icon"
      onClick={() => navigate(-1)}
      className={cn(" rounded-full", className)}
      {...props}
    >
      <ArrowLeftIcon className="size-5" />
    </Button>
  );
}

export default GoBackButton;
