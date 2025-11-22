import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

function CopyButton({ text, timeout = 1500, className, ...props }) {
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
      size="icon-sm"
      variant="ghost"
      onClick={handleCopy}
      className={cn("relative transition-all", className)}
      {...props}
    >
      {/* Copy Icon */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          copied ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <CopyIcon size={16} />
      </span>

      {/* Check Icon */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        <CheckIcon size={16} strokeWidth={3} />
      </span>
    </Button>
  );
}

export default CopyButton;
