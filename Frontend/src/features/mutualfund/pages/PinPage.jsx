import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useLocation } from "react-router";
import {
  useCreateInvestOrder,
  useCreateSip,
} from "../hooks/useCreateInvestOrder";
import { useGetFundData } from "../hooks/useGetFundData";

function PinPage() {
  const [pin, setPin] = useState("");
  const location = useLocation();
  const { schemeCode, amount, sipDate } = location.state;
  const { data: fund } = useGetFundData(schemeCode);

  const sipMutation = useCreateSip();
  const lumpsumMutation = useCreateInvestOrder();

  const activeMutation = sipDate ? sipMutation : lumpsumMutation;

  const { mutate: makePayment, isPending, isError } = activeMutation;

  const handleSubmit = (pin) => {
    makePayment({ amount, sipDate, fund, pin });
  };

  return (
    <div className="flex h-dvh flex-col sm:justify-center sm:gap-4">
      {/* Top Content */}
      <div className="mt-10 flex flex-1 flex-col gap-y-8 px-6 sm:flex-0">
        <div className="bg-accent space-y-2 rounded-2xl px-6 py-2">
          <div className="flex justify-between">
            Sending:
            <span className="text- ml-2 font-medium tabular-nums">
              ₹ 1000 {/* {formatToINR(amount, 2)}{" "} */}
            </span>
          </div>
          <div className="flex justify-between">
            To:
            <p className="text-md bg-accent ml-2 flex max-w-[70%] items-center gap-2 font-medium">
              Shubham Barman mutual fund direct
              {/* {sendingTo} <ChevronDownIcon className="size-2" /> */}
            </p>
          </div>
        </div>

        {/* PIN Input */}
        <div className="mx-auto w-full max-w-sm place-items-center">
          <p className="text-muted-foreground mb-4 text-center text-sm font-medium">
            Enter PIN
          </p>

          <InputOTP
            autoFocus
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={pin}
            onChange={(value) => {
              if (pin.length === 4 && value.length === 4 && value !== pin)
                return;
              if (value.length <= 4) setPin(value);
            }}
          >
            <InputOTPGroup className="gap-4">
              <InputOTPSlot
                className="size-12 text-base font-medium shadow-xs first:rounded-lg"
                index={0}
              />
              <InputOTPSlot
                className="size-12 rounded-lg text-base font-medium shadow-xs"
                index={1}
              />
              <InputOTPSlot
                className="size-12 rounded-lg text-base font-medium shadow-xs"
                index={2}
              />
              <InputOTPSlot
                className="size-12 text-base font-medium shadow-xs last:rounded-lg"
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        disabled={pin.length < 4 || isPending}
        size="lg"
        className="mx-auto my-6 w-[90%] font-medium sm:w-sm"
        onClick={() => mutate(pin)}
      >
        {isPending ? <Spinner /> : "Confirm"}
      </Button>
    </div>
  );
}

export default PinPage;
