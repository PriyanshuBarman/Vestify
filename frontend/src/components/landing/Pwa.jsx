import { useInstallApp } from "@/hooks/useInstallApp";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "../ui/button";

function Pwa() {
  const { handleInstall } = useInstallApp();

  return (
    <section className="from-landing/70 via-landing to-landing my-12 w-full overflow-hidden bg-gradient-to-t py-12">
      <div className="mx-auto flex h-100 w-full max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:h-96 md:flex-row md:px-8">
        <div className="text-background flex flex-col max-md:items-center max-md:text-center">
          <h2 className="text-[1.75rem] font-medium tracking-tight lg:text-6xl">
            Install the Web App
          </h2>
          <p className="mt-4 text-sm sm:mt-8 sm:text-base md:text-xl">
            Install our WebApp for better experience and offline support
          </p>
          <Button
            onClick={handleInstall}
            variant="ghost"
            size="lg"
            className="bg-background text-foreground mt-8 w-fit rounded-full !px-6 max-sm:font-normal sm:h-12"
          >
            Install WebApp
            <ArrowDownIcon className="size-5 max-sm:stroke-[1.5]" />
          </Button>
        </div>

        <div>
          <img
            src="./mockup-transparent.png"
            alt="mobile mockup"
            draggable={false}
            loading="lazy"
            className="h-full w-72 object-contain md:w-72 md:translate-y-40 lg:w-96 dark:hidden"
          />
          <img
            src="./mockup-transparent-dark.png"
            alt="mobile mockup"
            draggable={false}
            loading="lazy"
            className="hidden h-full w-72 object-contain md:w-72 md:translate-y-40 lg:w-96 dark:block"
          />
        </div>
      </div>
    </section>
  );
}

export default Pwa;
