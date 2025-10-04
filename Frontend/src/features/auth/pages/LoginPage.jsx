import Logo from "@/components/Logo";
import { LoginForm } from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden content-center space-y-15 font-medium lg:block">
        <h1 className="flex flex-col text-center text-2xl">
          Invest In Mutual Funds{" "}
          <span className="text-primary">Using Virtual Money</span>
        </h1>
        <img src="/Stocks.png" alt="Image" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Logo className="size-6 rounded-md sm:size-7" />
            Vestify
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
