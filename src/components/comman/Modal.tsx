import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type PropsWithChildren } from "react";

type ModalProps = PropsWithChildren &
  React.ComponentPropsWithoutRef<"div"> & {
    open: boolean;
    showCloseButton?: boolean;
    onClose: () => void;
    header?: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?: string;
  };

const Modal = ({
  onClose,
  open,
  header,
  description,
  showCloseButton = true,
  children,
  titleClassName,
  descriptionClassName,
  ...props
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogContent {...props} closeButton={showCloseButton}> */}
      <DialogContent {...props}>
        {header && (
          <DialogHeader>
            <DialogTitle className={titleClassName}>{header}</DialogTitle>
            {description && (
              <DialogDescription className={descriptionClassName}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
