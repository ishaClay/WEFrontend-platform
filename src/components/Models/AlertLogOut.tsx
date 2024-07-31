import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "../comman/Button/CustomButton";

interface AlertLogOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AlertLogOutDialog({
  isOpen,
  onClose,
  onConfirm,
}: AlertLogOutDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <Button style={{ display: "none" }} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#000]">Log Out Confirmation</AlertDialogTitle>
          <AlertDialogDescription className="text-[#606060]">
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
              type="button"
              variant={"secondary"}
              onClick={onClose}
              className="xl:px-[30px] px-[15px] py-2 font-semibold !font-abhaya text-sm text-[#020817]"
            >
              Cancel
            </Button>
          <PrimaryButton
            onClick={onConfirm}
            name="Log Out"
            className="xl:px-[30px] px-[15px] py-2 primary-background font-semibold !font-abhaya text-sm"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
