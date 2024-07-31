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
import { RiShutDownLine } from "react-icons/ri";

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
      <AlertDialogContent className="px-[52px] py-[30px]">
        <AlertDialogHeader className="items-center">
          <div className="flex justify-center items-center bg-[#297f94] rounded-full text-white mb-[26px] w-[66px] h-[66px]">

        <RiShutDownLine size={24} />
          </div>
          <AlertDialogTitle className="text-[#000] text-bold text-[24px] text-center mb-[8px]">Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#000] text-[16px] !mb-[34px] text-center">
            Do you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="xl:px-[30px] h-[52px] px-[15px] py-2 font-semibold !font-abhaya text-md text-[#020817]"
            >
              Cancel
            </Button>
          <PrimaryButton
            onClick={onConfirm}
            name="Log Out"
            className="xl:px-[30px] px-[15px] py-2 h-[52px] primary-background font-semibold !font-abhaya text-md !ml-[14px]"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
