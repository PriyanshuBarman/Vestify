import { useEffect, useState } from "react";
import { TZDate } from "@date-fns/tz";
import { addMonths, format, getDate, getDay } from "date-fns";
import { CalendarCheck2Icon, ChevronDownIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/useIsMobile";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addSuffix } from "@/features/mutual-fund/utils/formaters";

import StockSipDayPicker from "../StockSipDayPicker";

const WEEKDAY_NAMES = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
};

function SipDatePicker({ sipDate, setSipDate, frequency, setFrequency }) {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(sipDate);
  const [selectedFrequency, setSelectedFrequency] = useState(frequency);

  // Sync state if props change from outside
  useEffect(() => {
    setSelectedDate(sipDate);
    setSelectedFrequency(frequency);
  }, [sipDate, frequency]);

  const now = TZDate.tz("Asia/Kolkata");

  let defaultDay = getDate(now);
  let nextInstallmentMonth = format(addMonths(now, 1), "LLLL");
  let nextInstallmentText = "";

  if (selectedFrequency === "MONTHLY") {
    nextInstallmentText = `Next SIP installment on ${addSuffix(selectedDate || 1)} of ${nextInstallmentMonth}.`;
  } else {
    defaultDay = getDay(now);
    if (defaultDay === 0 || defaultDay === 6) defaultDay = 1; // Default to Monday if weekend
    nextInstallmentText = `Next SIP installment on next ${WEEKDAY_NAMES[selectedDate || 1]}.`;
  }

  const getButtonText = () => {
    if (!sipDate) return "Select Date";
    if (frequency === "MONTHLY") {
      return `Monthly on ${addSuffix(sipDate)}`;
    }
    return `Weekly on ${WEEKDAY_NAMES[sipDate]}`;
  };

  const isUpdateDisabled = () => {
    if (sipDate === selectedDate && frequency === selectedFrequency)
      return true;
    if (selectedFrequency === "MONTHLY" && selectedDate > 28) return true;
    if (
      selectedFrequency === "WEEKLY" &&
      (selectedDate < 1 || selectedDate > 5)
    )
      return true;
    return false;
  };

  const handleUpdate = () => {
    setFrequency(selectedFrequency);
    setSipDate(selectedDate);
  };

  if (isMobile) {
    return (
      <Drawer
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDate(sipDate);
            setSelectedFrequency(frequency);
          }
        }}
      >
        <DrawerTrigger asChild>
          <Button variant="outline" className="rounded-xl text-xs shadow-none">
            <CalendarCheck2Icon /> {getButtonText()}
            <ChevronDownIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="font-medium">
              Choose SIP installment{" "}
              {selectedFrequency === "MONTHLY" ? "date" : "day"}
            </DrawerTitle>
          </DrawerHeader>

          <SipDatePickerContent
            selectedFrequency={selectedFrequency}
            setSelectedFrequency={setSelectedFrequency}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            defaultDay={defaultDay}
            nextInstallmentText={nextInstallmentText}
            isMobile={isMobile}
          />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={handleUpdate}
                disabled={isUpdateDisabled()}
                className="disabled:bg-muted-foreground w-full"
              >
                Update
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setSelectedDate(sipDate);
          setSelectedFrequency(frequency);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className={sipDate && "ring-primary ring-3"}>
          <CalendarCheck2Icon /> {getButtonText()}
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-medium">
            Choose SIP installment{" "}
            {selectedFrequency === "MONTHLY" ? "date" : "day"}
          </DialogTitle>
        </DialogHeader>
        <SipDatePickerContent
          selectedFrequency={selectedFrequency}
          setSelectedFrequency={setSelectedFrequency}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          defaultDay={defaultDay}
          nextInstallmentText={nextInstallmentText}
          isMobile={isMobile}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              size="lg"
              onClick={handleUpdate}
              disabled={isUpdateDisabled()}
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

function SipDatePickerContent({
  selectedFrequency,
  setSelectedFrequency,
  selectedDate,
  setSelectedDate,
  defaultDay,
  nextInstallmentText,
  isMobile,
}) {
  return (
    <div className="px-4">
      <Tabs
        value={selectedFrequency}
        onValueChange={(val) => {
          setSelectedFrequency(val);
          const now = TZDate.tz("Asia/Kolkata");
          if (val === "MONTHLY") {
            setSelectedDate(getDate(now));
          } else {
            let day = getDay(now);
            if (day === 0 || day === 6) day = 1;
            setSelectedDate(day);
          }
        }}
        className="w-full my-4"
      >
        <TabsList className="w-full ">
          <TabsTrigger value="MONTHLY">Monthly</TabsTrigger>
          <TabsTrigger value="WEEKLY">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>

      <StockSipDayPicker
        selectedDay={selectedDate}
        onSelectDay={setSelectedDate}
        defaultDay={defaultDay}
        frequency={selectedFrequency}
        className={isMobile ? "py-4" : "py-6"}
      />

      <DialogDescription className="text-center">
        {nextInstallmentText}
      </DialogDescription>
    </div>
  );
}

export default SipDatePicker;
