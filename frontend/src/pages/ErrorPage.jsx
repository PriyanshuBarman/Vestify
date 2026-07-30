import { useState } from "react";
import { ArrowLeftIcon, HomeIcon, RotateCwIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Button } from "../components/ui/button";

function ErrorPage({ error }) {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [searchParams] = useSearchParams();
  const hideRefresh = searchParams.get("hideRefresh") === "true";

  return (
    <div className="flex flex-col h-svh py-4 items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <img
              src="/server-error.svg"
              alt="Server error"
              loading="lazy"
              draggable="false"
              className="size-70 sm:size-96"
            />
          </EmptyMedia>
          <EmptyTitle className="sm:text-2xl">
            {hideRefresh
              ? "Something went wrong"
              : "Oops! Something went wrong"}
          </EmptyTitle>
          <EmptyDescription className="sm:text-md">
            <p>
              {hideRefresh
                ? "Please go back to the home page"
                : "Please refresh the page or go back."}
            </p>
            <p>
              If issue persist, please notify us{" "}
              <a href="mailto:vestify.contact@gmail.com" className="underline">
                here
              </a>
            </p>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex flex-row  items-center justify-center gap-2">
          <Button
            asChild
            className="rounded-full bg-landing hover:bg-landing/90 text-xs sm:p-5! sm:text-sm"
          >
            <Link to="/stocks#explore">
              <HomeIcon /> Home
            </Link>
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="rounded-full bg-landing hover:bg-landing/90 text-xs sm:py-5 sm:text-sm"
          >
            <ArrowLeftIcon /> Go Back
          </Button>
          {!hideRefresh && (
            <Button
              size="icon"
              onClick={() => window.location.reload()}
              className="rounded-full bg-landing hover:bg-landing/90 text-xs font-normal sm:p-5"
            >
              <RotateCwIcon />
            </Button>
          )}
        </EmptyContent>
      </Empty>
      <Button
        variant="ghost"
        onClick={() => setShowError(!showError)}
        className="text-muted-foreground  text-xs font-normal mt-auto"
      >
        {showError ? "Hide" : "Show"} error
      </Button>

      {showError && (
        <p className="text-xs mt-2 break-all">{error?.message || ""}</p>
      )}
    </div>
  );
}

export default ErrorPage;
