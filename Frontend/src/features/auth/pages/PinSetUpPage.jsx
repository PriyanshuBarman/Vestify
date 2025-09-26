import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useGetUserData } from "@/hooks/queries/internalQueries";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";
import { useSetPin } from "../hooks/useSetPin";

function PinSetupPage() {
  const [pin, setPin] = useState("");
  const { mutate, isPending } = useSetPin();
  const { data: user } = useGetUserData();

  if (!user || user?.hasPin) return <Navigate to="/" />;

  return (
    <div className="flex h-dvh flex-col sm:justify-center sm:gap-4">
      {/* Top Content */}
      <div className="mt-10 flex flex-1 flex-col gap-y-8 px-6 sm:flex-0">
        <div className="text-center">
          <h1 className="mb-1 text-xl font-semibold">Set up your PIN</h1>
          <p className="text-muted-foreground text-sm">
            Create a secure 4-digit PIN
          </p>
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
            <InputOTPGroup className="gap-3">
              <InputOTPSlot
                className="size-13 text-base font-medium shadow-xs first:rounded-xl"
                index={0}
              />
              <InputOTPSlot
                className="size-13 rounded-xl text-base font-medium shadow-xs"
                index={1}
              />
              <InputOTPSlot
                className="size-13 rounded-xl text-base font-medium shadow-xs"
                index={2}
              />
              <InputOTPSlot
                className="size-13 text-base font-medium shadow-xs last:rounded-xl"
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        disabled={pin.length < 4 || isPending}
        size="lg"
        className="mx-auto my-4 w-[90%] font-medium sm:w-sm"
        onClick={() => mutate(pin)}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Confirm"}
      </Button>
    </div>
  );
}

export default PinSetupPage;
