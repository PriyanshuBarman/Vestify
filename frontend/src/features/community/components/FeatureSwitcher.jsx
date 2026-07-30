import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { id: "stocks", label: "Stocks" },
  { id: "mutual-funds", label: "Mutual Funds" },
];

function FeatureSwitcher({ activeFeature, onSelect, className }) {
  return (
    <div
      className={cn(
        "py-3 flex sticky top-[168px] w-full bg-background sm:top-21 z-20 justify-center px-4",
        className,
      )}
    >
      <div className="relative flex rounded-full bg-muted p-1">
        {FEATURES.map((feature) => {
          const isActive = activeFeature === feature.id;

          return (
            <Button
              key={feature.id}
              size="sm"
              variant="ghost"
              onClick={() => onSelect(feature.id)}
              className={cn(
                "relative rounded-full text-xs sm:text-sm px-5 shadow-none ",
                isActive ? " text-background!" : " text-muted-foreground! ",
              )}
            >
              <span className="relative z-10">{feature.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-feature-tab"
                  className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureSwitcher;
