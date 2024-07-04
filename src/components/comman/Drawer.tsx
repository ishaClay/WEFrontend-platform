import React from "react";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

interface DrawerProps {
  open?: boolean;
  onClose: () => void;
  label?: React.ReactNode;
  children: React.ReactNode;
  headerConent?: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}
const Drawer = ({
  open,
  onClose,
  label,
  headerConent,
  children,
  className,
  side = "left",
}: DrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      {label}
      <SheetContent side={side} className={className}>
        <SheetHeader>{headerConent}</SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
