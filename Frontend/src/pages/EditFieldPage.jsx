import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "@/hooks/useGetUser";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

function EditFieldPage() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const { field } = useParams();
  const { mutate, isPending } = useUpdateProfile();

  const isSameValueEntered = value === user?.profile?.[field];

  const handleSave = () => {
    if (field === "username") {
      mutate({ username: value, name: user?.profile?.name });
    } else {
      mutate({ name: value, username: user?.profile?.username });
    }
    navigate(-1);
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <Field className="mt-4 sm:mt-28">
        <FieldLabel className="text-base font-medium">
          Enter your new {field}
        </FieldLabel>
        <Input
          placeholder={user.profile[field]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 w-full"
          autoFocus
        />
        {isSameValueEntered && (
          <FieldError>This is your current {field}</FieldError>
        )}
      </Field>

      <Button
        disabled={!value || isSameValueEntered}
        size="lg"
        className="mx-auto mt-auto w-full sm:mt-14 sm:w-fit"
        onClick={handleSave}
      >
        {isPending && <Spinner />} Save Changes
      </Button>
    </div>
  );
}

export default EditFieldPage;
