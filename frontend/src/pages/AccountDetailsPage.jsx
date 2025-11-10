import CopyrightFooter from "@/components/CopyrightFooter";
import GoBackBar from "@/components/GoBackBar";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Spinner } from "@/components/ui/spinner";
import { useGetUser } from "@/hooks/useGetUser";
import { useRemoveAvatar } from "@/hooks/useRemoveAvatar.js.js";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import {
  CameraIcon,
  ChevronRightIcon,
  Edit2Icon,
  ImageUpIcon,
  Trash2Icon,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function AccountDetailsPage() {
  const { data: user } = useGetUser();
  const navigate = useNavigate();
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  return (
    <div className="h-full sm:mx-auto sm:max-w-lg">
      <GoBackBar title="Account details" showSearchIcon={false} />
      <div className="relative mx-auto mt-4 w-fit">
        <ProfileAvatar className="size-36" />
        <EditAvatarModal uploadAvatar={uploadAvatar}>
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
        </EditAvatarModal>
      </div>

      <ItemGroup className="mt-12">
        <Item size="sm">
          <ItemContent>
            <ItemDescription>Name</ItemDescription>
            <ItemTitle className="text-base"> {user?.profile?.name}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/edit-field/name")}
            >
              <Edit2Icon />
            </Button>
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemDescription>Username</ItemDescription>
            <ItemTitle className="text-base">
              {" "}
              @{user?.profile?.username}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/edit-field/username")}
            >
              <Edit2Icon />
            </Button>
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemDescription>Email</ItemDescription>
            <ItemTitle className="text-base"> {user?.email}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/change-email")}
            >
              <Edit2Icon />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      <CopyrightFooter className="absolute inset-x-0 bottom-4" />
    </div>
  );
}

export default AccountDetailsPage;

function EditAvatarModal({ children, uploadAvatar }) {
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

      <ResponsiveModalContent className="pb-8">
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
            className="grid w-full grid-cols-[auto_1fr] items-center"
          >
            <ImageUpIcon />
            <div className="flex items-center justify-between border-b p-4 font-medium">
              Select from gallery
              <span className="text-2xs">(Max 5MB)</span>
              <ChevronRightIcon className="ml-auto" />
            </div>
          </Button>
        </>

        <Button
          onClick={handleRemoveAvatarClick}
          variant="ghost"
          className="mt-4 grid w-full grid-cols-[auto_1fr] items-center"
        >
          <Trash2Icon />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Remove
            <ChevronRightIcon className="ml-auto" />
          </div>
        </Button>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
