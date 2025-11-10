import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SipDayPicker({ selectedDay, onSelectDay, defaultDay, className }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={cn("grid grid-cols-7 place-items-center gap-2", className)}>
      {days.map((day) => (
        <Button
          key={day}
          size="lg"
          variant="ghost"
          disabled={day > 28}
          className={cn(
            "sm:text-md hover:!bg-primary/90 size-9 rounded-full p-0 font-normal transition-all ease-linear sm:size-12 sm:font-medium",
            selectedDay === day && "bg-primary text-primary-foreground",
            day === defaultDay && "bg-input text-foreground",
          )}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </Button>
      ))}
    </div>
  );
}

export default SipDayPicker;
