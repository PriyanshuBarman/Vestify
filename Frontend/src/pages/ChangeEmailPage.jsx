import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "@/hooks/useGetUser";
import { useRequestEmailChange } from "@/hooks/useRequestEmailChange";
import { useState } from "react";

function ChangeEmailPage() {
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();
  const { data: user } = useGetUser();
  const { mutate, isPending, isError, error, reset } = useRequestEmailChange();

  const isSameValueEntered = newEmail === user?.email;
  const isInvalidPassword =
    error?.response?.data?.message?.toLowerCase() === "incorrect password";

  const handleSave = () => {
    mutate({ password, newEmail });
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <FieldGroup className="mt-4 sm:mt-28">
        <Field>
          <FieldLabel className="text-md font-medium">
            Enter your new email
          </FieldLabel>
          <Input
            placeholder={user?.email}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="h-11 w-full"
          />
          {isSameValueEntered && (
            <FieldError>This is your current email</FieldError>
          )}
        </Field>

        <Field data-invalid={isInvalidPassword}>
          <FieldLabel className="text-md flex-wrap gap-y-1 font-medium">
            Enter Vestify password{" "}
            <FieldDescription className="text-xs">
              (Not your new email password)
            </FieldDescription>
          </FieldLabel>

          <Input
            autoFocus
            aria-invalid={isInvalidPassword}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (isError) reset();
            }}
            className="h-11 w-full"
          />
        </Field>
      </FieldGroup>

      <Button
        disabled={
          !newEmail ||
          !password ||
          isSameValueEntered ||
          isPending ||
          isInvalidPassword
        }
        size="lg"
        className="mt-auto w-full sm:mt-14 sm:w-fit"
        onClick={handleSave}
      >
        {isPending && <Spinner />} Save Changes
      </Button>
    </div>
  );
}

export default ChangeEmailPage;
