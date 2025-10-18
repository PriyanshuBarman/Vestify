import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useVerifyEmailChangeOTP } from "../hooks/useVerifyEmailChangeOTP";
import { useLocation } from "react-router";
import GoBackBar from "@/components/GoBackBar";
import { useRequestEmailChange } from "@/hooks/useRequestEmailChange";

function VerifyEmailChangeOTPPage() {
  const [otp, setOtp] = useState("");
  const { newEmail, password } = useLocation().state ?? {};

  const { mutate, isPending, isError, error, reset } =
    useVerifyEmailChangeOTP();
  const { mutate: resendOTP, isPending: isResendingOTP } =
    useRequestEmailChange();

  const isInvalidOTP =
    error?.response?.data?.message?.toLowerCase() === "invalid otp";

  const handleVerifyOTP = () => {
    mutate({ otp, newEmail, password });
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <div className="mt-4 flex flex-1 flex-col items-start gap-y-8 sm:mt-28 sm:flex-0">
        <div className="">
          <h1 className="mb-1 text-lg font-medium">OTP Verification</h1>
          <p className="text-muted-foreground text-sm">
            Enter the OTP sent to your new email
            <br />
            <b>{newEmail}</b>
          </p>
        </div>

        <InputOTP
          autoFocus
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(value) => {
            if (isError) reset();
            setOtp(value);
          }}
        >
          <InputOTPGroup
            className={`gap-3 sm:gap-8 ${isInvalidOTP && "shake-animation text-destructive"}`}
          >
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
        <Button
          size="sm"
          variant="ghost"
          disabled={isResendingOTP || isPending}
          onClick={() => resendOTP({ newEmail, password })}
          className="text-primary pl-2"
        >
          Resend OTP
        </Button>
      </div>

      <Button
        disabled={otp.length < 4 || isPending || isError}
        size="lg"
        className="mt-auto w-full sm:mt-14 sm:w-fit"
        onClick={handleVerifyOTP}
      >
        {isPending ? <Spinner /> : "Confirm"}
      </Button>
    </div>
  );
}

export default VerifyEmailChangeOTPPage;
