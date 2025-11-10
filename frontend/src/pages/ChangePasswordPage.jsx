import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useChangePassword } from "@/hooks/useChangePassword";
import { useState } from "react";

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const { mutate, isPending, isError, error, reset } = useChangePassword();

  const isSameValueEntered = !!newPassword && currentPassword === newPassword;
  const isInvalidPassword =
    error?.response?.data?.message?.toLowerCase() ===
    "current password is incorrect";

  const handleCurrentPaswordChange = (e) => {
    setCurrentPassword(e.target.value);
    if (isError) reset();
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleSave = () => {
    mutate({ currentPassword, newPassword });
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <FieldGroup className="mt-4">
        <Field data-invalid={isInvalidPassword}>
          <FieldLabel htmlFor="currentPassword">
            Enter Current Password
          </FieldLabel>
          <Input
            aria-invalid={isInvalidPassword}
            autoFocus
            id="currentPassword"
            value={currentPassword}
            onChange={handleCurrentPaswordChange}
            type="text"
            className="h-11"
          />
        </Field>

        <Field data-invalid={isSameValueEntered}>
          <FieldLabel htmlFor="newPassword">Enter New Password</FieldLabel>
          <Input
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            aria-invalid={isSameValueEntered}
            type="text"
            className="h-11"
          />
          {isSameValueEntered && (
            <FieldError>
              New password can't be same as current password
            </FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button
        disabled={
          !currentPassword ||
          !newPassword ||
          isSameValueEntered ||
          isInvalidPassword ||
          isPending ||
          isError
        }
        size="lg"
        className="mt-auto w-full sm:mt-14 sm:w-fit"
        onClick={handleSave}
      >
        {isPending && <Spinner />}  Save Changes
      </Button>
    </div>
  );
}

export default ChangePasswordPage;
