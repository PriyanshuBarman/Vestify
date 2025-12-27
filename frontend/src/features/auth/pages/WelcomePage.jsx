import InstallAppButton from "@/components/InstallAppButton";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "@/hooks/useGetUser";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MailIcon } from "lucide-react";
import { lazy } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
const GoogleIcon = lazy(() => import("@/components/icons/GoogleIcon"));
const MarqueeLogos = lazy(() => import("@/components/MarqueeLogos"));
const NavbarPublic = lazy(() => import("@/components/layouts/NavbarPublic"));

function WelcomePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: user } = useGetUser();
  const { googleLogin, isPending } = useGoogleAuth();

  const referralCode = searchParams.get("referralCode");

  if (user && !user?.hasPin) return <Navigate to="/auth/pin-setup" replace />;
  if (user && user?.hasPin)
    return <Navigate to="/mutual-funds#explore" replace />;

  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center pb-4">
      <NavbarPublic />
      <div className="relative mt-10 flex max-w-5xl flex-col items-center justify-center px-4 sm:mt-16">
        <InstallAppButton alwaysVisible />
        <Heading />
        <p className="text-foreground/80 text-md mt-6 max-w-[34ch] text-center tracking-tight duration-700 sm:mt-8 sm:max-w-[52ch] sm:text-lg">
          Invest, start SIPs, track portfolio, use virtual wallet, send virtual
          money to others — all virtually with a Groww.in UI.
        </p>
      </div>

      <div className="mt-auto flex w-full flex-col items-center justify-center gap-4 px-5 sm:mt-12 sm:flex-row">
        <Button
          size="lg"
          onClick={googleLogin}
          disabled={isPending}
          className="dark:text-foreground h-11 w-full rounded-2xl bg-gradient-to-r from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] transition-colors ease-linear hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91] sm:w-fit sm:!px-8"
        >
          {isPending ? <Spinner className="size-5" /> : <GoogleIcon />} Continue
          with Google
        </Button>
        <Button
          size="lg"
          variant="outline"
          disabled={isPending}
          onClick={() =>
            navigate(
              referralCode
                ? `/auth/signup?referralCode=${referralCode}`
                : "/auth/signup",
            )
          }
          className="text-foreground h-11 w-full rounded-2xl shadow-none ease-in sm:w-fit sm:!px-8 sm:shadow-xs"
        >
          <MailIcon className="size-5" />
          Continue with Email
        </Button>
      </div>

      {!isMobile && (
        <>
          <MarqueeLogos classNames="mt-16" />
          <FieldDescription className="text-muted-foreground/90 px-6 pt-10 text-center sm:text-xs">
            By clicking continue, you agree to our{" "}
            <Link to="/terms-and-conditions">Terms</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </FieldDescription>
        </>
      )}
    </div>
  );
}

export default WelcomePage;

function Heading() {
  return (
    <h2 className="mt-6 text-center text-[2.32rem] leading-tight font-[530] sm:text-[4.45rem]/20 sm:tracking-tight">
      <span className="text-[#00b35c]">Virtually</span> Invest in Mutual funds
      with{" "}
      <a
        href="https://groww.in"
        target="_blank"
        tabIndex={-1}
        className="pointer-events-none hover:underline sm:pointer-events-auto"
      >
        Groww
        <span className="text-[0.9em]">.in</span>
      </a>{" "}
      ui
    </h2>
  );
}
