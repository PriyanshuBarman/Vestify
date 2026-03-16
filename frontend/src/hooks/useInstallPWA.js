import { useEffect, useState } from "react";
import { toast } from "sonner";

const checkIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const checkStandalone = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

export function useInstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(() => checkIOS());
  const [isStandalone, setIsStandalone] = useState(() => checkStandalone());

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      toast.info("Tap the share button and select 'Add to Home Screen'");
      return;
    }
    if (isStandalone) {
      toast.info("App is already installed");
      return;
    }
    if (!deferredPrompt) {
      toast.info("Already installed or not supported by your browser");
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      toast.success("Installing...");
    }

    setDeferredPrompt(null);
  };

  return {
    isPwaSupported: !!deferredPrompt,
    isIOS,
    isStandalone,
    handleInstallClick,
  };
}
