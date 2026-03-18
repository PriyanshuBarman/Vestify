import { useState } from "react";
import { CameraIcon, Edit2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useGetUser } from "@/hooks/useGetUser";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
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
import { Spinner } from "@/components/ui/spinner";
import CopyrightFooter from "@/components/CopyrightFooter";
import GoBackBar from "@/components/GoBackBar";
import EditAvatarModal from "@/components/overlays/EditAvatarModal";
import ProfileAvatar from "@/components/ProfileAvatar";

function AccountDetailsPage() {
  const { data: user } = useGetUser();
  const navigate = useNavigate();
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();
  const [isModalOpen, setIsModalOpen] = useState(false); // edit avatar modal

  return (
    <div className="h-full sm:mx-auto sm:max-w-lg">
      <GoBackBar title="Account details" showSearchIcon={false} />
      <div className="relative mx-auto mt-4 w-fit">
        <ProfileAvatar className="size-36" />
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          variant="secondary"
          className="absolute -bottom-4 left-1/2 h-7 -translate-x-1/2 transform border"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <CameraIcon /> Edit
            </>
          )}
        </Button>
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
              // Email changes require a custom domain (needed for providers like Resend/SendGrid).
              // We're currently on a free subdomain, so this is disabled for now.
              // onClick={() => navigate("/change-email")}
              onClick={() =>
                toast.info(
                  "Please contact support to change your email address.",
                )
              }
            >
              <Edit2Icon />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      <CopyrightFooter className="fixed inset-x-0 bottom-4" />
      <EditAvatarModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        uploadAvatar={uploadAvatar}
      />
    </div>
  );
}

export default AccountDetailsPage;
