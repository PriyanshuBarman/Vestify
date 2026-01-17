import { ChevronUpIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function ScrollToTopButton({ scrollThreshold = 600 }) {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top"
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed right-6 bottom-6 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="size-12 rounded-full bg-[#00c968] active:scale-95"
            aria-label="Scroll to top"
          >
            <ChevronUpIcon className="size-7" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
