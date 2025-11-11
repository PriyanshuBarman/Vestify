import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle
} from "@/components/ui/responsive-modal";
import { useRemoveAvatar } from "@/hooks/useRemoveAvatar.js.js";
import {
  ChevronRightIcon,
  ImageUpIcon,
  Trash2Icon
} from "lucide-react";
import { useRef } from "react";
import IconWrapper from "../IconWrapper";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../ui/item";

function EditAvatarModal({ isOpen, onOpenChange, uploadAvatar }) {
  const { mutate: removeAvatar } = useRemoveAvatar();
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData);
    onOpenChange(false);
  };

  const handleRemoveAvatarClick = () => {
    removeAvatar();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="pb-6">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="text-start">
            Change Profile Picture
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>

        <ItemGroup>
          <Item size="sm" onClick={() => fileInputRef.current?.click()}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".png, .jpeg, .jpg"
              className="hidden"
            />
            <ItemMedia variant="icon">
              <IconWrapper>
                <ImageUpIcon className="size-3" />
              </IconWrapper>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Select from gallery
                <span className="text-2xs">(Max 5MB)</span>
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>

          <ItemSeparator />

          <Item size="sm" onClick={handleRemoveAvatarClick}>
            <ItemMedia>
              <IconWrapper>
                <Trash2Icon className="size-3" />
              </IconWrapper>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Remove</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>
        </ItemGroup>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default EditAvatarModal;
