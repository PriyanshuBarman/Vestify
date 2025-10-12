import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUser } from "@/hooks/useGetUser";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

function EditFieldPage() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const { field } = useParams();
  const { mutate } = useUpdateProfile();

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
    <div className="sm:mx-auto sm:mt-30 sm:flex sm:max-w-lg sm:flex-col sm:items-center sm:justify-center">
      <GoBackBar showSearchIcon={false} />

      <div className="mt-4 w-full space-y-2 px-4 sm:space-y-4">
        <Label htmlFor="field-input" className="text-base font-medium">
          Enter your new {field}
        </Label>
        <Input
          placeholder={user.profile[field]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 w-full"
          autoFocus
        />
        {isSameValueEntered && (
          <p className="text-destructive text-sm">
            This is your current {field}
          </p>
        )}
      </div>

      <Button
        disabled={!value || isSameValueEntered}
        size="lg"
        className="fixed inset-x-0 bottom-4 mx-auto w-[90%] sm:static sm:mt-8 sm:w-fit"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default EditFieldPage;
