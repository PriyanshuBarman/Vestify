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
          <img src="/server-error.svg" alt="" className="size-70 sm:size-96" />
        </EmptyMedia>
        <EmptyTitle className="sm:text-2xl">
          Oops! Something went wrong
        </EmptyTitle>
        <EmptyDescription className="sm:text-md">
          <p>Please refresh the page or go back.</p>
          <p>
            If issue persist, please notify us{" "}
            <a href="mailto:vestify.contact@gmail.com" className="underline">
              here
            </a>
          </p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-row items-center justify-center">
        <Button
          onClick={() => navigate(-1)}
          className="rounded-full text-xs font-normal sm:!p-5 sm:text-sm"
        >
          <ArrowLeftIcon /> Go Back
        </Button>
        <Button
          onClick={() => window.location.reload()}
          className="rounded-full text-xs font-normal sm:p-5"
        >
          <RefreshCwIcon />
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPage;
