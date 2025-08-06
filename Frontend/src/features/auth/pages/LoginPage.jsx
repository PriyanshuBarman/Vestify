import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden content-center space-y-15 font-medium lg:block">
        <h1 className="flex flex-col text-center text-2xl">
          Invest In Stocks & Mutual Funds <span className="text-primary">With Virtual Money</span>
        </h1>
        <img src="/Stocks.png" alt="Image" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-4 p-6 font-[450] md:p-10">
        <div className="flex justify-center gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vestiify
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
