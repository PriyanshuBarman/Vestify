import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const WEEKDAYS = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat", disabled: true },
  { value: 0, label: "Sun", disabled: true },
];

function StockSipDayPicker({
  selectedDay,
  onSelectDay,
  defaultDay,
  className,
  frequency = "MONTHLY",
}) {
  if (frequency === "WEEKLY") {
    return (
      <div className={cn("w-full py-2", className)}>
        <RadioGroup
          value={selectedDay?.toString() || "1"}
          onValueChange={(val) => onSelectDay(Number(val))}
          className="gap-0"
        >
          {WEEKDAYS.filter((d) => !d.disabled).map((day) => (
            <Label
              key={day.value}
              htmlFor={`day-${day.value}`}
              className="flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:gap-6 sm:text-base sm:font-medium"
            >
              <RadioGroupItem
                value={day.value.toString()}
                id={`day-${day.value}`}
                className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
              />
              <span>{day.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    );
  }

  // MONTHLY
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

export default StockSipDayPicker;
