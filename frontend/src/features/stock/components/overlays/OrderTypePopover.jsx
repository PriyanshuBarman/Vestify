import { useState } from "react";
import { CalendarIcon, SettingsIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function OrderTypePopover({ type, onTypeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Settings"
          size="icon-sm"
          variant="outline"
          className="rounded-full text-xs shadow-none"
        >
          <SettingsIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="" className="w-72 p-4">
        <h4 className="font-semibold text-sm mb-3">Customize Order Type</h4>
        <RadioGroup
          value={type}
          onValueChange={(val) => {
            onTypeChange(val);
            setIsOpen(false);
          }}
        >
          <Label className="flex cursor-pointer items-start gap-3 border-b py-2.5 font-[450] transition-colors">
            <RadioGroupItem
              value="REGULAR"
              className="data-[state=checked]:border-primary border-muted-foreground mt-0.5 size-4 border-2"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium">Regular Order</span>
              <span className="text-[11px] text-muted-foreground">
                Place an order at limit or market price
              </span>
            </div>
          </Label>

          <Label className="flex cursor-pointer items-start gap-3 py-2.5 font-[450] transition-colors">
            <RadioGroupItem
              value="SL"
              className="data-[state=checked]:border-primary border-muted-foreground mt-0.5 size-4 border-2"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium">SL Order</span>
              <span className="text-[11px] text-muted-foreground">
                Trigger sell order at a price lower than market
              </span>
            </div>
          </Label>
        </RadioGroup>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2 font-[450] text-sm">
            <CalendarIcon className="size-4" /> Validity
          </div>

          <div className="space-x-2">
            {["Immediate", "Day", "Year"].map((item) => (
              <Button
                key={item}
                size="sm"
                variant="outline"
                disabled={item !== "Day"}
                className={cn(
                  "rounded-full py-2 px-4",
                  item === "Day" && "bg-foreground/10 border-foreground",
                )}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default OrderTypePopover;
