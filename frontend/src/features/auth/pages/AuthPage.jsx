import LogoShapeOnly from "@/components/LogoShapeOnly";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { AtSignIcon } from "lucide-react";
import { lazy } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useGetUser } from "@/hooks/useGetUser";
const GoogleIcon = lazy(() => import("@/components/icons/GoogleIcon"));

function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { googleLogin, isPending } = useGoogleAuth();
  const referralCode = searchParams.get("referralCode");

  const { data: user } = useGetUser();
  if (user && !user.hasPin) return <Navigate to="/auth/pin-setup" />;
  if (user?.hasPin) return <Navigate to="/mutual-funds#explore" />;

  return (
    <div className="mx-auto flex min-h-svh flex-col items-center justify-center px-4">
      <title>Vestify Login/SignUp</title>
      <div className="relative mt-10 flex max-w-5xl flex-col items-center justify-center px-4 sm:mt-16">
        <div className="flex items-center justify-center">
          <LogoShapeOnly className="size-30 sm:size-42" />
          <h2 className="text-muted-foreground relative top-1 right-8 text-center text-[2.32rem] leading-tight font-semibold sm:right-10 sm:text-7xl sm:tracking-tight">
            <span className="sr-only">V</span>estify
          </h2>
        </div>
        <p className="text-foreground/80 mt-2 text-center text-base tracking-tight duration-700 max-sm:max-w-[28ch] sm:text-xl">
          Experience real investing, in a fully virtual environment
        </p>
      </div>

      <div className="mt-30 flex w-full flex-col items-center justify-center gap-4 sm:mt-18 sm:flex-row">
        <Button
          size="lg"
          variant="secondary"
          onClick={googleLogin}
          disabled={isPending}
          className="text-md h-11.5 rounded-3xl border-b !px-16 active:scale-95 sm:rounded-full sm:border-r sm:!px-8"
        >
          {isPending ? <Spinner className="size-5" /> : <GoogleIcon />} Continue
          with Google
        </Button>
        <Button
          size="lg"
          variant="secondary"
          disabled={isPending}
          onClick={() =>
            navigate(
              referralCode
                ? `/auth/signup?referralCode=${referralCode}`
                : "/auth/signup",
            )
          }
          className="text-md h-11.5 rounded-3xl border-b !px-16 active:scale-95 sm:h-12 sm:rounded-full sm:border-r sm:!px-8 sm:shadow-xs"
        >
          <AtSignIcon className="size-5" />
          Continue with Email
        </Button>
      </div>

      <FieldDescription className="text-muted-foreground/70 pt-10 text-center text-xs max-sm:max-w-[30ch] sm:pt-18 sm:text-sm">
        By continuing you agree to our{" "}
        <Link to="/terms-and-conditions" className="font-semibold">
          Terms
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="font-semibold">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}

export default AuthPage;
