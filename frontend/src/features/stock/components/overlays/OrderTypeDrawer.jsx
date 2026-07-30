import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function OrderTypeDrawer({ isOpen, onOpenChange, type, onTypeChange, symbol }) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-start!">
          <DrawerTitle>Customize Order Type</DrawerTitle>
        </DrawerHeader>

        <div className="p-4">
          <RadioGroup
            value={type}
            onValueChange={(val) => {
              onTypeChange(val);
              onOpenChange(false);
            }}
          >
            <Label className="flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:gap-6 sm:text-base sm:font-medium">
              <RadioGroupItem
                value="REGULAR"
                className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
              />
              <div className="flex flex-col gap-1">
                <span>Regular Order</span>
                <span className="text-xs text-muted-foreground">
                  Place an order at limit or market price
                </span>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:gap-6 sm:text-base sm:font-medium">
              <RadioGroupItem
                value="SL"
                className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
              />
              <div className="flex flex-col gap-1">
                <span>SL Order</span>
                <span className="text-xs text-muted-foreground">
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
        </div>

        <DrawerFooter>
          <Item asChild variant="outline" className="rounded-2xl">
            <Link to={`/stocks/gtt-order/${symbol}`} replace>
              <ItemContent>
                <ItemTitle>Trigger order (erilier GTT)</ItemTitle>
                <ItemDescription className="text-xs">
                  Plan orders ahead without constant tracking
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon" variant="ghost">
                  <ChevronRightIcon />
                </Button>
              </ItemActions>
            </Link>
          </Item>

          <DrawerClose asChild className="mt-4">
            <Button>Continue</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default OrderTypeDrawer;
