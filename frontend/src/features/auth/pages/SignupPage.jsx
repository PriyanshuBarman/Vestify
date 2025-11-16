import Logo from "@/components/Logo";
import { Link } from "react-router";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex justify-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-medium sm:text-lg">
          <Logo className="size-6 sm:size-7" />
          Vestify
        </Link>
      </div>
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
