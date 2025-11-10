import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DeleteIcon } from "lucide-react";

function PinKeypad({ handleVirtualInput, className }) {
  const handleNumberClick = (num) => {
    handleVirtualInput(num);
  };

  const handleBackspace = () => {
    handleVirtualInput("backspace");
  };

  const handleClear = () => {
    handleVirtualInput("clear");
  };

  return (
    <div
      className={cn(
        "Pin-KeyPad mx-4 grid grid-cols-3 place-items-center gap-x-10 tabular-nums",
        className,
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="active:bg-accent h-14 w-24 rounded-2xl text-2xl font-semibold"
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={handleClear}
        className="active:bg-accent h-14 w-24 rounded-2xl text-xl font-normal"
      >
        AC
      </Button>
      <Button
        variant="ghost"
        className="active:bg-accent h-14 w-24 rounded-2xl text-2xl font-semibold"
        onClick={() => handleNumberClick(0)}
      >
        0
      </Button>
      <Button
        variant="ghost"
        onClick={handleBackspace}
        className="active:bg-accent h-14 w-24 rounded-2xl py-7"
      >
        <DeleteIcon className="size-10 stroke-1" />
      </Button>
    </div>
  );
}

export default PinKeypad;
