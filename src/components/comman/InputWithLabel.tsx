import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "./FormError";

type InputWithLabelProps = InputProps & {
  label?: string;
  labelNote?: string;
  error?: string;
  className?: string;
  id?: number | string;
  name?: string;
  placeholder?: string;
  mainClassName?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
  isShowErrorBorder?: boolean;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      label,
      className,
      id,
      mainClassName,
      name,
      error,
      icon,
      labelNote,
      placeholder,
      labelClassName,
      isShowErrorBorder,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={cn(`space-y-2`, mainClassName)}>
        {label && (
          <Label
            className={cn(
              "font-primary text-[14px] font-[400] leading-normal text-[#111821] md:text-[14px]",
              labelClassName
            )}
            htmlFor={id}
          >
            {label}
            <span className="ps-1.5 text-xs text-destructive">{labelNote}</span>
          </Label>
        )}
        <div
          className={cn(
            "items-center gap-1 overflow-hidden",
            icon ? "flex" : ""
          )}
        >
          {icon && icon}
          <Input
            {...rest}
            id={id}
            name={name}
            ref={ref}
            placeholder={placeholder}
            className={cn(
              `h-auto`,
              { "border-red-500": isShowErrorBorder && error },
              className
            )}
          />
        </div>
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default InputWithLabel;
