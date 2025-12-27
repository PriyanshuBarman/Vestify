import { useInstallApp } from "@/hooks/useInstallApp";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function InstallAppButton({ alwaysVisible = false }) {
  const { isInstallable, handleInstall } = useInstallApp();
  if (!isInstallable && !alwaysVisible) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      className="bg-accent mt-4 flex h-fit items-center gap-2 rounded-full p-0 text-sm shadow-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-101 hover:shadow-lg sm:mt-0 sm:px-1 sm:py-0.5"
    >
      <Badge className="dark:text-foreground text-2xs ml-[3px] rounded-full bg-[#00b35cc1] font-normal sm:ml-0 sm:h-6 sm:text-xs">
        NEW
      </Badge>
      <span className="text-[0.8rem] font-normal">Install web app</span>
      <span className="flex size-7 items-center justify-center rounded-full">
        <ArrowRightIcon className="text-muted-foreground sm:text-foreground size-4" />
      </span>
    </Button>
  );
}

export default InstallAppButton;
