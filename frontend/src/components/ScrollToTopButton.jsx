import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

function ScrollToTopButton({ scrollThreshold = 600 }) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed right-6 bottom-6 z-50 size-12 rounded-full bg-[#00c968] active:scale-95"
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="size-7" />
    </Button>
  );
}

export default ScrollToTopButton;
