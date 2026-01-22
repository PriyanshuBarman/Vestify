import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

let deferredPrompt = null;
let isPromptTracked = false;

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

      // Track only once per session
      if (!isPromptTracked) {
        trackEvent("PWA", "Install Prompt Shown");
        isPromptTracked = true;
      }
    };

    const handleAppInstalled = () => {
      trackEvent("PWA", "Installed Successfully");
      toast.success("App installed successfully!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
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
      trackEvent("PWA", "Install Accepted");
      const toastId = toast.loading("Installing the app...");
      setTimeout(() => toast.dismiss(toastId), 2000);
    } else {
      trackEvent("PWA", "Install Dismissed");
    }

    deferredPrompt = null;
    setIsInstallable(false);
  };

  return {
    isInstallable,
    handleInstall,
  };
}
