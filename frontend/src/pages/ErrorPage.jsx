import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();
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
            If issue persist, please notify us{" "}
            <a href="mailto:vestify.contact@gmail.com" className="underline">
              here
            </a>
          </p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={() => navigate(-1)}
          className="rounded-full text-xs font-normal"
        >
          <ArrowLeftIcon /> Go Back
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPage;
