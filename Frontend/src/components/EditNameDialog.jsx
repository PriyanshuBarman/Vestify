import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2Icon } from "lucide-react";

function EditFieldDialog({
  isOpen,
  onOpenChange,
  currentValue,
  onSave,
  triggerButton,
  fieldType = "name", // "name" or "username"
  dialogTitle,
  fieldLabel,
  placeholder,
  onConfirm,
}) {
  const getDialogTitle = () => {
    if (dialogTitle) return dialogTitle;
    return fieldType === "username" ? "Edit Username" : "Edit Full Name";
  };

  const getFieldLabel = () => {
    if (fieldLabel) return fieldLabel;
    return fieldType === "username" ? "Username" : "Full Name";
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    return fieldType === "username"
      ? "Enter your username"
      : "Enter your full name";
  };

  const getInputId = () => {
    return fieldType === "username" ? "username" : "name";
  };

  const handleSave = () => {
    if (onConfirm) {
      onConfirm(currentValue);
    } else {
      // Default behavior - just log and close
      console.log(`New ${fieldType}:`, currentValue);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label
              htmlFor={getInputId()}
              className="text-sm font-medium text-gray-700"
            >
              {getFieldLabel()}
            </label>
            <Input
              id={getInputId()}
              value={currentValue}
              onChange={(e) => onSave(e.target.value)}
              className="w-full"
              placeholder={getPlaceholder()}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="px-6">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditFieldDialog;
