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
import { format } from "date-fns";
import { CalendarCheck2Icon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { addSuffix } from "../utils/formaters";
import { getNextInstallmentDateAfterEdit } from "../utils/sip";
import SipDayPicker from "./SipDayPicker";

function EditSipDatePicker({ sipDate, setSipDate, sipDetail }) {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(sipDate);

  const newNextInstallmentDate = getNextInstallmentDateAfterEdit(
    selectedDate,
    sipDetail.nextInstallmentDate,
  );

  const TriggerButton = (
    <Button
      variant="outline"
      className="max-sm:rounded-2xl max-sm:text-xs max-sm:font-normal max-sm:shadow-none"
    >
      <CalendarCheck2Icon />
      Monthly on {addSuffix(sipDate)}
      <ChevronDownIcon />
    </Button>
  );

  return isMobile ? (
    <Drawer onOpenChange={() => setSelectedDate(sipDate)}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Choose new SIP installment date</DrawerTitle>
        </DrawerHeader>

        <SipDayPicker
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          defaultDay={sipDetail.sipDate}
          className="p-4"
        />

        {newNextInstallmentDate && selectedDate !== sipDate && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Next SIP installment on{" "}
            {addSuffix(format(newNextInstallmentDate, "d"))} of{" "}
            {format(newNextInstallmentDate, "LLLL")}.
          </p>
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              onClick={() => setSipDate(selectedDate)}
              disabled={selectedDate === sipDetail.sipDate || selectedDate > 28}
              className="w-full"
            >
              Update
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={() => setSelectedDate(sipDate)}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-medium">
            Choose new SIP installment date
          </DialogTitle>
        </DialogHeader>

        <SipDayPicker
          defaultDay={sipDetail.sipDate}
          selectedDay={selectedDate}
          onSelectDay={setSelectedDate}
          className="py-6"
        />

        {newNextInstallmentDate && selectedDate !== sipDate && (
          <DialogDescription className="text-center">
            Next SIP installment on{" "}
            {addSuffix(format(newNextInstallmentDate, "d"))} of{" "}
            {format(newNextInstallmentDate, "LLLL")}.
          </DialogDescription>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              size="lg"
              onClick={() => setSipDate(selectedDate)}
              disabled={selectedDate === sipDetail.sipDate || selectedDate > 28}
              className="w-full"
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditSipDatePicker;
