import { useInstallApp } from "@/hooks/useInstallApp";
import { SparklesIcon } from "lucide-react";
import { Button } from "./ui/button";

function InstallAppButton({ alwaysVisible = false }) {
  const { isInstallable, handleInstall } = useInstallApp();
  if (!isInstallable && !alwaysVisible) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="secondary"
      className="group text-foreground/90 flex h-fit items-center gap-1.5 rounded-full border-r border-b py-1 shadow-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-101 hover:shadow-lg active:scale-95 has-[>svg]:px-3 sm:gap-2"
    >
      <SparklesIcon className="text-foreground/60 size-3.5" />
      <span className="text-[0.78rem] font-normal sm:text-[0.88rem]">
        Install web app
      </span>
      <div className="ml-1 flex items-center justify-center sm:mt-px">
        <span className="bg-primary/70 size-[7px] rounded-full" />
        <span className="bg-primary absolute size-2 animate-ping rounded-full" />
      </div>
    </Button>
  );
}

export default InstallAppButton;
