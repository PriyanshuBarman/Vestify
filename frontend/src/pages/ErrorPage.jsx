import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../components/ui/button";

function ErrorPage() {
  return (
    <Empty className="flex h-dvh items-center justify-center">
      <EmptyHeader>
        <EmptyMedia>
          <img src="/server-error.svg" alt="" className="size-70 sm:size-90" />
        </EmptyMedia>
        <EmptyTitle className="sm:text-2xl">
          Oops! Something went wrong
        </EmptyTitle>
        <EmptyDescription>
          <p>Please refresh the page or go back.</p>
          <p>
            If issue persist, please notify us {" "}
            <a href="mailto:vestify.contact@gmail.com" className="underline">
              here
            </a>
          </p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={() => window.location.reload()}
          className="rounded-full"
        >
          <RefreshCwIcon /> Refresh
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPage;
