import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useInstallApp } from "@/hooks/useInstallApp";

function Cta({ className }) {
  return (
    <section className={cn("w-full max-w-7xl overflow-hidden px-4", className)}>
      <Card />
    </section>
  );
}

export default Cta;

function Card() {
  const { handleInstall } = useInstallApp();

  return (
    <div className="text-background flex flex-wrap justify-center gap-10 rounded-3xl border bg-gradient-to-t from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] transition-colors ease-linear sm:gap-8 sm:bg-gradient-to-l lg:justify-between">
      <div className="mt-10 mr-10 ml-8 lg:my-auto lg:ml-10">
        <h2 className="text-2xl font-semibold tracking-tight lg:text-5xl">
          Install the Web App
        </h2>
        <p className="mt-1 text-sm sm:mt-4 sm:text-base">
          Install our WebApp for better experience and offline support
        </p>
        <Button
          onClick={handleInstall}
          variant="ghost"
          className="bg-background group text-foreground mt-8 h-12 w-fit rounded-full !px-6 sm:mt-10"
        >
          Install WebApp{" "}
          <ArrowUpRightIcon className="size-5 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-102" />
        </Button>
      </div>

      <div className="max-sm:mx-auto sm:mr-10">
        <img
          src="/cta-mobile.png"
          alt=""
          className="mt-auto aspect-square w-full max-w-3xs md:h-72 md:w-auto md:max-w-none"
        />
      </div>
    </div>
  );
}
