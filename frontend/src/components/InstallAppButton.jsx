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
      className="bg-accent mt-4 flex h-auto items-center gap-2 rounded-full px-1 py-0.5 text-sm shadow-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-101 hover:shadow-lg sm:mt-0"
    >
      <Badge className="dark:text-foreground h-6 rounded-full bg-[#00b35cc1] text-xs font-normal">
        NEW
      </Badge>
      <span className="font-normal">Install web app</span>
      <span className="flex size-7 items-center justify-center rounded-full">
        <ArrowRightIcon className="size-4" />
      </span>
    </Button>
  );
}

export default InstallAppButton;
