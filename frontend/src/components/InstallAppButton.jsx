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
      className="mt-4 h-8 gap-2 rounded-full border pr-0.5 pl-1.5 shadow-none sm:h-9 sm:gap-3 sm:pr-1.5 sm:pl-2"
    >
      <Badge className="rounded-full bg-[#00b35cc1] font-normal">NEW</Badge>
      <span className="sm:text-md text-sm font-normal">Install web app</span>
      <span className="flex size-7 items-center justify-center rounded-full">
        <ArrowRightIcon className="size-4" />
      </span>
    </Button>
  );
}

export default InstallAppButton;
