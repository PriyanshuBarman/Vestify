import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Empty className="flex h-dvh items-center justify-center">
      <EmptyHeader>
        <EmptyTitle className="sm:text-2xl">404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => navigate(-1)} size="lg" className="rounded-full">
          <ChevronLeftIcon /> Back
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default NotFoundPage;
