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
import { tz } from "@date-fns/tz";
import { addMonths, differenceInDays, format } from "date-fns";
import { CalendarCheck2Icon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { addSuffix } from "../utils/formaters";
import SipDayPicker from "./SipDayPicker";

function EditSipDatePicker({ sipDate, setSipDate, sipDetail }) {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(sipDate);

  const getNextinstallmentMonth = () => {
    const diff = differenceInDays(sipDetail.nextInstallmentDate, new Date(), {
      in: tz("Asia/Kolkata"),
    });

    return format(
      addMonths(sipDetail.nextInstallmentDate, diff <= 2 ? 1 : 0),
      "LLLL",
    );
  };

  return isMobile ? (
    <Drawer onOpenChange={() => setSelectedDate(sipDate)}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <CalendarCheck2Icon /> Monthly on {addSuffix(sipDate)}{" "}
          <ChevronDownIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Choose SIP installment date</DrawerTitle>
        </DrawerHeader>

        <SipDayPicker
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          defaultDay={sipDetail.sipDate}
          className="p-4"
        />

        {sipDate < 29 && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Next SIP installment on {addSuffix(selectedDate)} of{" "}
            {getNextinstallmentMonth()}.
          </p>
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
        <Button variant="outline">
          <CalendarCheck2Icon /> Monthly on {addSuffix(sipDate)}{" "}
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
          defaultDay={sipDetail.sipDate}
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          className="py-6"
        />

        {selectedDate < 29 && (
          <DialogDescription className="text-center">
            Next SIP installment on {addSuffix(selectedDate)} of{" "}
            {getNextinstallmentMonth()}.
          </DialogDescription>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setSipDate(selectedDate)}
              disabled={
                selectedDate === sipDetail.sipDate ||
                sipDate === selectedDate ||
                selectedDate > 28
              }
              className="w-full"
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditSipDatePicker;
