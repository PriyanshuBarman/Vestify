import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../components/ui/button";

function ErrorPage() {
  return (
    <Empty className="flex h-dvh items-center justify-center">
      <EmptyHeader>
        <EmptyTitle className="sm:text-2xl">Something went wrong</EmptyTitle>
        <EmptyDescription className="whitespace-pre-line">{`Please refresh the page or goback.
        If not solved contact the owner.
        `}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          className="rounded-full"
        >
          <RefreshCwIcon /> Refresh
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPage;
