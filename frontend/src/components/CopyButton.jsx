import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function CopyButton({ label, text, timeout = 1500, className, ...props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Button
      size={label ? "default" : "icon-sm"}
      variant="ghost"
      onClick={handleCopy}
      className={cn("relative w-auto transition-all", className)}
      {...props}
    >
      {/* Copy Icon */}
      <div
        className={cn(
          " gap-2 flex items-center justify-center transition-all duration-200",
          copied ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {label}
        <CopyIcon size={16} />
      </div>

      {/* Check Icon */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        <CheckIcon size={16} strokeWidth={3} />
      </div>
    </Button>
  );
}

export default CopyButton;
