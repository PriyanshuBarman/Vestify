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
    <div className="mx-auto flex min-h-svh flex-col items-center sm:pb-4">
      <NavbarPublic googleLogin={googleLogin} isPending={isPending} />
      <div className="relative mt-24 flex max-w-4xl flex-col items-center justify-center px-4 sm:mt-28">
        <Heading />
        <p className="text-muted-foreground text-md mt-4 max-w-[34ch] text-center tracking-tight duration-700 sm:mt-8 sm:max-w-[52ch] sm:text-lg">
          Invest, start SIPs, track portfolio, use virtual wallet, send virtual
          money to others — all virtually with a{" "}
          <a
            href="https://groww.in"
            target="_blank"
            tabIndex={-1}
            className="hover:underline"
          >
            Groww.in
          </a>{" "}
          UI.
        </p>
      </div>

      {isMobile && <MarqueeLogos classNames="mt-12 mb-4 sm:mb-0 sm:mt-0" />}

      <div className="mt-auto flex w-full flex-col items-center justify-center gap-4 px-5 sm:mt-12 sm:flex-row sm:space-y-6">
        <Button
          size="lg"
          onClick={googleLogin}
          disabled={isPending}
          className="dark:text-foreground w-full rounded-full bg-gradient-to-r from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] py-5 transition-colors ease-linear hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91] sm:w-fit sm:py-5.5"
        >
          {isPending && <Spinner className="size-5" />} <GoogleIcon /> Continue
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
          className="text-foreground w-full rounded-full py-5 shadow-none ease-in sm:w-fit sm:py-5.5 sm:shadow-xs"
        >
          <MailIcon className="size-5" />
          Continue with Email
        </Button>

        <FieldDescription className="text-2xs px-6 text-center sm:hidden sm:text-xs">
          By clicking continue, you agree to our{" "}
          <Link to="/terms-and-conditions">Terms</Link> and{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </FieldDescription>
      </div>
      {!isMobile && (
        <>
          <MarqueeLogos classNames="my-10 " />
          <FieldDescription className="text-2xs px-6 text-center sm:text-xs">
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
    <h2 className="text-center text-4xl leading-tight font-[550] sm:text-[4.25rem]/20 sm:font-medium sm:tracking-tight">
      <span className="text-[#00b35c]">Virtually</span> Invest in Mutual funds
      with{" "}
      <a
        href="https://groww.in"
        target="_blank"
        tabIndex={-1}
        className="text-muted-foreground hover:underline"
      >
        Groww
        <span className="text-[0.9em] font-semibold">.in</span>
      </a>{" "}
      ui
    </h2>
  );
}
