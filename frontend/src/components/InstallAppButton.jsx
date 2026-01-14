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
      className="group text-foreground/70 flex h-fit items-center gap-1.5 rounded-full border-r border-b py-1 shadow-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-101 hover:shadow-lg active:scale-95 has-[>svg]:px-3 sm:gap-2 dark:border-0 dark:py-[5px]"
    >
      <SparklesIcon className="text-muted-foreground size-3.5" />
      <span className="text-[0.78rem] font-normal sm:text-[0.88rem]">
        Install web app
      </span>
      <div className="ml-1 flex items-center justify-center sm:mt-px">
        <span className="size-[7px] rounded-full bg-[#00b35cc3]" />
        <span className="absolute size-2 animate-ping rounded-full bg-[#00b35c]" />
      </div>
    </Button>
  );
}

export default InstallAppButton;
