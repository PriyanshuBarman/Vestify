import { Link } from "react-router";
import Logo from "@/components/Logo";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex justify-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-medium sm:text-lg">
          <Logo className="size-6 sm:size-7" />
          Vestify
        </Link>
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
