import { useEffect, useState } from "react";
import { toast } from "sonner";

let deferredPrompt = null;

export function useInstallApp() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (deferredPrompt) {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.info("Already installed or unsupported by this browser");
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      const toastId = toast.loading("Installing the app...");
      setTimeout(() => toast.dismiss(toastId), 2000);
    }

    deferredPrompt = null;
    setIsInstallable(false);
  };

  return {
    isInstallable,
    handleInstall,
  };
}
