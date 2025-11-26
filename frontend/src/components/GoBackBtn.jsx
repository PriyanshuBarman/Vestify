import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <Button
      aria-label="Go back button"
      size="icon-sm"
      onClick={() => navigate(-1)}
      className="bg-background text-foreground w-fit rounded-full hover:bg-transparent"
    >
      <ArrowLeftIcon className="size-6" />
    </Button>
  );
}

export default GoBackBtn;
