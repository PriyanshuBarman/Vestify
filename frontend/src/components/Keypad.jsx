import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sanitizeAmount } from "@/utils/formatters";
import { DeleteIcon } from "lucide-react";

function Keypad({ amount, setAmount, className }) {
  const handleNumberClick = (num) => {
    setAmount(sanitizeAmount((amount || "") + num.toString()));
  };

  const handleBackspace = () =>
    setAmount(amount && amount.length > 0 ? amount.slice(0, -1) : "");

  return (
    <div
      className={cn(
        "KeyPad mx-4 grid grid-cols-3 place-items-center gap-x-10 tabular-nums",
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
        onClick={() => handleNumberClick(".")}
        className="active:bg-accent h-14 w-24 rounded-2xl text-2xl font-semibold"
      >
        .
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
        className="active:bg-accent h-14 w-24 rounded-2xl"
      >
        <DeleteIcon className="size-10 stroke-1" />
      </Button>
    </div>
  );
}

export default Keypad;
