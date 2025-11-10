import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBackClose } from "@/hooks/useBackClose";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { formatToINR } from "@/utils/formatters";
import { useEffect, useRef, useState } from "react";
import PinKeypad from "../PinKeypad";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import SendIcon from "../icons/SendIcon";

const LENGTH = 4;

function ResponsivePinDialog({
  isOpen,
  setIsOpen,
  amount,
  sendingTo,
  onSubmit,
  isError,
  error,
  isPending,
}) {
  const isMobile = useIsMobile();
  const [pin, setPin] = useState(new Array(LENGTH).fill(""));
  const inputRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0); // for mobile

  const isInvalidPin =
    error?.response?.data?.message?.toLowerCase() === "invalid pin";

  useBackClose(isOpen, () => setIsOpen(false));

  useEffect(() => {
    if (isError) {
      setPin(new Array(LENGTH).fill(""));
      setCurrentIndex(0);
      inputRefs?.current[0]?.focus();

      if (isInvalidPin) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [isError, isInvalidPin]);

  // For Mobile
  const handleVirtualInput = (value) => {
    const newArr = [...pin];

    if (typeof value === "number") {
      // Prevent overwriting last filled box
      if (currentIndex === LENGTH - 1 && newArr[currentIndex]) {
        return;
      }

      // Only take the first digit in case multiple come from mobile keyboard
      const digit = value.toString().charAt(0);

      newArr[currentIndex] = digit;
      setPin(newArr);

      // Move forward if not last
      if (currentIndex < LENGTH - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    if (value === "backspace") {
      if (newArr[currentIndex]) {
        // Clear current
        newArr[currentIndex] = "";
        setPin(newArr);
      } else if (currentIndex > 0) {
        // Move back and clear
        newArr[currentIndex - 1] = "";
        setPin(newArr);
        setCurrentIndex(currentIndex - 1);
      }
    }

    if (value === "clear") {
      setPin(new Array(LENGTH).fill(""));
      setCurrentIndex(0);
    }
  };

  // Below are for Desktop

  useEffect(() => {
    inputRefs?.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    const newArr = [...pin];
    newArr[index] = value.trim();
    setPin(newArr);

    if (value.trim()) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && pin.every((v) => v !== "")) {
      onSubmit(pin.join(""));
    }
    if (!e.target.value && e.key === "Backspace") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-full w-full max-w-full flex-col overflow-hidden rounded-none p-0 sm:h-fit sm:gap-8 sm:rounded-2xl sm:p-6">
        {isPending && (
          <div className="absolute inset-0 z-50 grid place-items-center">
            <Spinner className="text-primary size-12 sm:hidden" />
          </div>
        )}

        <DialogHeader className="p-6 sm:p-0">
          <DialogTitle className="text sr-only">Confirm Payment</DialogTitle>
          <DialogDescription className="bg-accent text-foreground space-y-2 rounded-2xl px-6 py-4 font-medium shadow">
            <div className="flex justify-between">
              Sending:
              <span className="tabular-nums">{formatToINR(amount)}</span>
            </div>
            <div className="flex justify-between">
              To:
              <span className="ml-2 max-w-[900%]">{sendingTo}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* PIN Input */}
        <div className="mx-auto w-full place-items-center">
          <p className="text-muted-foreground mb-4 text-center text-sm font-medium">
            Enter PIN
          </p>

          <div
            className={cn(
              "flex items-center justify-center gap-2 sm:gap-4",
              isInvalidPin && "shake-animation",
            )}
          >
            {pin.map((digit, index) => (
              <div key={index} className="Box relative">
                <Input
                  type="password"
                  autoComplete="off"
                  inputMode="none"
                  readOnly={isMobile}
                  onFocus={() => setCurrentIndex(index)}
                  value={digit}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  onChange={(e) => handleOnChange(e.target.value, index)}
                  id={`pin-input-${index}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={cn(
                    "size-13 rounded-xl text-center !text-2xl font-medium",
                    currentIndex === index && isMobile
                      ? "border-ring ring-ring/50 ring-[3px]"
                      : "",
                  )}
                />

                {/* Fake Caret */}
                {isMobile && currentIndex === index && !digit && (
                  <div className="Fake-Caret pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-auto items-center">
          <Button
            size="lg"
            onClick={() => onSubmit(pin.join(""))}
            disabled={!pin.every((v) => v !== "") || isPending}
            className="mx-auto my-4 w-[90%] sm:mt-12 sm:mb-0 sm:w-full"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                Pay <SendIcon />
              </>
            )}
          </Button>
          {isMobile && <PinKeypad handleVirtualInput={handleVirtualInput} />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResponsivePinDialog;
