import LogoShapeOnly from "@/components/LogoShapeOnly";
import { Link } from "react-router";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex justify-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-3xl font-medium sm:text-lg"
        >
          <LogoShapeOnly className="size-34" />
          <span className="sr-only">Vestify</span>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
