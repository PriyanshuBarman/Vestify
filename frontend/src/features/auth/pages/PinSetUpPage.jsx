import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "@/hooks/useGetUser";
import { useSetPin } from "@/hooks/useSetPin";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { Navigate } from "react-router";

function PinSetupPage() {
  const [pin, setPin] = useState("");
  const { mutate, isPending } = useSetPin();
  const { data: user } = useGetUser();

  if (!user || user?.hasPin) return <Navigate to="/mutual-funds#explore" />;

  return (
    <div className="flex h-dvh flex-col sm:justify-center sm:gap-4">
      {/* Top Content */}
      <div className="mt-10 flex flex-1 flex-col items-center gap-y-8 px-8 sm:flex-0">
        <div className="text-center">
          <h1 className="mb-1 text-xl font-semibold sm:text-2xl">
            Set up your PIN
          </h1>
          <p className="text-muted-foreground text-sm sm:max-w-[50ch] sm:text-base">
            This PIN will be required to make investments and send virtual money
            to other users
          </p>
        </div>

        {/* PIN Input */}
        <div className="mx-auto w-full max-w-sm place-items-center">
          <p className="text-muted-foreground mb-4 text-center text-sm font-medium">
            Create PIN
          </p>

          <InputOTP
            autoFocus
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={pin}
            onChange={(value) => {
              if (pin.length === 4 && value.length === 4 && value !== pin) {
                return;
              }
              if (value.length <= 4) setPin(value);
            }}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot
                className="size-13 text-base font-medium shadow-none first:rounded-xl"
                index={0}
              />
              <InputOTPSlot
                className="size-13 rounded-xl text-base font-medium shadow-none"
                index={1}
              />
              <InputOTPSlot
                className="size-13 rounded-xl text-base font-medium shadow-none"
                index={2}
              />
              <InputOTPSlot
                className="size-13 text-base font-medium shadow-none last:rounded-xl"
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
        onClick={() => mutate({ pin })}
      >
        {isPending && <Spinner />} Confirm
      </Button>
    </div>
  );
}

export default PinSetupPage;
