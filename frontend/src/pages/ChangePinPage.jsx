import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { useChangePin } from "@/hooks/useChangePin";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

function ChangePasswordPage() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const { mutate, isPending, isError, error, reset } = useChangePin();

  const handleSave = () => {
    mutate({ currentPin, newPin });
  };

  const isInvalidPin =
    error?.response?.data?.message?.toLowerCase() ===
    "current pin is incorrect";

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <FieldGroup className="mt-4 items-center sm:mt-24 sm:gap-12">
        <Field data-invalid={isInvalidPin} className="sm:w-fit">
          <FieldLabel>Enter Current Pin</FieldLabel>
          <InputOTP
            autoFocus
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={currentPin}
            onChange={(value) => {
              if (isError) reset();
              if (
                currentPin.length === 4 &&
                value.length === 4 &&
                value !== currentPin
              ) {
                return;
              }
              setCurrentPin(value);
            }}
          >
            <InputOTPGroup
              className={`gap-3 sm:gap-6 ${isInvalidPin && "shake-animation"}`}
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
        </Field>

        <Field
          data-invalid={!!newPin && currentPin === newPin}
          className="sm:w-fit"
        >
          <FieldLabel>Enter New Pin</FieldLabel>
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={newPin}
            onChange={(value) => {
              if (
                newPin.length === 4 &&
                value.length === 4 &&
                value !== newPin
              ) {
                return;
              }
              setNewPin(value);
            }}
          >
            <InputOTPGroup className="gap-3 sm:gap-6">
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
          {!!newPin && currentPin === newPin && (
            <FieldError>New pin can't be same as current pin</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button
        disabled={
          currentPin.length < 4 ||
          newPin.length < 4 ||
          currentPin === newPin ||
          isPending ||
          isError
        }
        size="lg"
        className="mx-auto mt-auto w-full sm:mt-14 sm:w-fit"
        onClick={handleSave}
      >
        {isPending && <Spinner />} Save Changes
      </Button>
    </div>
  );
}

export default ChangePasswordPage;
