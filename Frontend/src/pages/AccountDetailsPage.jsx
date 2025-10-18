import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useGetUser";
import {
  CameraIcon,
  ChevronRightIcon,
  Edit2Icon,
  ImageUpIcon,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from "react-router";

function AccountDetailsPage() {
  const { data: user } = useGetUser();
  const navigate = useNavigate();
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  return (
    <div className="sm:mx-auto sm:max-w-lg">
      <GoBackBar title="Account details" showSearchIcon={false} />
      <div className="relative mx-auto mt-4 w-fit">
        <ProfileAvatar className="size-36" />
        <Com uploadAvatar={uploadAvatar}>
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 left-1/2 h-7 -translate-x-1/2 transform border"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <CameraIcon /> Edit
              </>
            )}
          </Button>
        </Com>
      </div>

      <div className="mt-12">
        <div className="flex justify-between border-b p-6">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="text-base font-medium capitalize">
              {user?.profile?.name}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/edit-field/name")}
          >
            <Edit2Icon />
          </Button>
        </div>

        <div className="flex justify-between border-b p-6">
          <div>
            <p className="text-muted-foreground">Username</p>
            <p className="text-base font-medium">@{user?.profile?.username}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/edit-field/username")}
          >
            <Edit2Icon />
          </Button>
        </div>
        <div className="flex justify-between border-b p-6">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="text-base font-medium">{user?.email}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/change-email")}
          >
            <Edit2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountDetailsPage;

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Separator } from "@/components/ui/separator";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import { useRef, useState } from "react";
import { useRemoveAvatar } from "@/hooks/useRemoveAvatar.js";
import { Spinner } from "@/components/ui/spinner";
import ProfileAvatar from "@/components/ProfileAvatar";

function Com({ children, uploadAvatar }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: removeAvatar } = useRemoveAvatar();
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData);
    setIsOpen(false);
  };

  const handleRemoveAvatarClick = () => {
    removeAvatar();
    setIsOpen(false);
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveModalTrigger asChild>{children}</ResponsiveModalTrigger>

      <ResponsiveModalContent className="gap-2 pb-10">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="text-start">
            Change Profile Picture
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>

        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".png, .jpeg, .jpg"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            className="flex w-full justify-start"
          >
            <ImageUpIcon /> Select from gallery (max 5MB)
            <ChevronRightIcon className="ml-auto" />
          </Button>
        </>

        <Separator />
        <Button
          onClick={handleRemoveAvatarClick}
          variant="ghost"
          className="flex w-full justify-start"
        >
          <Trash2Icon /> Remove
          <ChevronRightIcon className="ml-auto" />
        </Button>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
