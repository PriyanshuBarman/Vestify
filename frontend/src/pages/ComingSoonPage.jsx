import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-foreground mb-4 text-lg font-bold sm:text-3xl">Coming Soon</h1>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          This feature is currently under development and will be available soon.
        </p>
        <Button onClick={() => navigate(-1)}>← Go Back</Button>
      </div>
    </div>
  );
}

export default ComingSoonPage;
