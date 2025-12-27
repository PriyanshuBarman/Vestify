import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { TZDate } from "@date-fns/tz";
import { addMonths, format, getDate, setDate } from "date-fns";
import { CalendarCheck2Icon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import SipDayPicker from "../SipDayPicker";
import { addSuffix } from "../../utils/formaters";

function DatePicker({ sipDate, setSipDate }) {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(sipDate);

  const nextInstallmentMonth = format(
    addMonths(TZDate.tz("Asia/Kolkata"), 1),
    "LLLL",
  );

  return isMobile ? (
    <Drawer onOpenChange={() => setSelectedDate(sipDate)}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-xl text-xs shadow-none">
          <CalendarCheck2Icon />{" "}
          {sipDate ? `Monthly on ${addSuffix(sipDate)}` : "Select Date"}
          <ChevronDownIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-medium">
            Choose SIP installment date
          </DrawerTitle>
        </DrawerHeader>

        <SipDayPicker
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          defaultDay={getDate(TZDate.tz("Asia/Kolkata"))}
          className="p-4"
        />

        {sipDate < 29 && (
          <DialogDescription className="text-center">
            Next SIP installment on {addSuffix(selectedDate)} of{" "}
            {nextInstallmentMonth}.
          </DialogDescription>
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              onClick={() => setSipDate(selectedDate)}
              disabled={sipDate === selectedDate || selectedDate > 28}
              className="disabled:bg-muted-foreground w-full"
            >
              Update
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={() => setSelectedDate(sipDate)}>
      <DialogTrigger asChild>
        <Button variant="outline" className={sipDate && "ring-primary ring-3"}>
          <CalendarCheck2Icon />{" "}
          {sipDate ? `Monthly on ${addSuffix(sipDate)}` : "Select Date"}
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-medium">
            Choose SIP installment date
          </DialogTitle>
        </DialogHeader>

        <SipDayPicker
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          className="py-6"
        />

        {selectedDate < 29 && (
          <DialogDescription className="text-center">
            Next SIP installment on {addSuffix(selectedDate)} of{" "}
            {nextInstallmentMonth}.
          </DialogDescription>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              size="lg"
              onClick={() => setSipDate(selectedDate)}
              disabled={sipDate === selectedDate || selectedDate > 28}
              className="disabled:bg-muted-foreground w-full"
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DatePicker;
