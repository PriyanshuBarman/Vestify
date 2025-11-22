import GoogleIcon from "@/components/icons/GoogleIcon";
import LogoShapeOnly from "@/components/LogoShapeOnly";
import MarqueeLogos from "@/components/MarqueeLogos";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { useGetUser } from "@/hooks/useGetUser";
import { MailIcon } from "lucide-react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { Spinner } from "@/components/ui/spinner";

function WelcomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: user } = useGetUser();
  const { googleLogin, isPending } = useGoogleAuth();

  const referralCode = searchParams.get("referralCode");

  if (user && !user?.hasPin) return <Navigate to="/auth/pin-setup" replace />;
  if (user && user?.hasPin)
    return <Navigate to="/mutual-funds#explore" replace />;

  return (
    <div className="mx-auto flex h-dvh flex-col items-center space-y-6 pt-12 sm:justify-center sm:space-y-14 sm:pt-0">
      <MarqueeLogos />

      <div className="mb-20 flex max-w-3xl flex-col items-center justify-center">
        <LogoShapeOnly className="size-38 sm:size-42" />
        <span className="sr-only">Vestify</span>
        <Heading />
        <p className="text-muted-foreground text-md text-center tracking-tight whitespace-pre-line sm:block sm:max-w-[46ch] sm:text-base sm:whitespace-normal">
          {`Invest, start SIPs, track portfolio, use a virtual
           wallet, send virtual money to others 
           — all virtually with a Groww UI.`}
        </p>
      </div>

      <div className="mt-auto w-full max-w-lg space-y-4 px-4 sm:mt-4 sm:space-y-6">
        <Button
          size="lg"
          onClick={googleLogin}
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] py-5.5 transition-colors ease-linear hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91]"
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
          className="w-full rounded-full py-5.5 shadow-none ease-in sm:shadow-xs"
        >
          <MailIcon className="size-5" />
          Continue with Email
        </Button>

        <FieldDescription className="text-2xs px-6 text-center sm:text-xs">
          By clicking continue, you agree to our{" "}
          <Link to="/terms-and-conditions">Terms</Link> and{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </div>
  );
}

export default WelcomePage;

function Heading() {
  return (
    <h2 className="scroll-m-20 pb-2 text-center text-[1.45rem] leading-tight font-[550] tracking-tight sm:text-4xl sm:font-[550] sm:tracking-normal">
      Invest in Mutual funds <span className="text-[#00b35c]">Virtually</span>
    </h2>
  );
}

// function Heading2() {
//   return (
//     <h2 className="scroll-m-20 px-2 pb-2 text-center text-[1.45rem] leading-tight font-[550] tracking-tight sm:text-4xl sm:font-[550] sm:tracking-normal">
//       Invest in Mutual Funds with{" "}
//       <span className="text-[#00b35c]">Virtual money</span>
//     </h2>
//   );
// }
