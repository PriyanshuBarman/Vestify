import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const scrolledBefore = localStorage.getItem("hasScrolled") === "true";
    setHasScrolled(scrolledBefore);

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);

        if (window.scrollY > 0 && !hasScrolled) {
          localStorage.setItem("hasScrolled", "true");
          setHasScrolled(true);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  if (!isVisible || hasScrolled) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce delay-1000">
      <ChevronDownIcon className="text-muted-foreground size-9 stroke-[1.5px] transition-transform duration-300 group-hover:translate-y-1 sm:size-10 sm:stroke-1" />
    </div>
  );
}

export default ScrollIndicator;
