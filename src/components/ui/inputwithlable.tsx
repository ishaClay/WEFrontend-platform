import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const InputWithLable = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, ...props }, ref) => {
        return (
            <div className="flex flex-col">
                {label && <label className="mb-[8px] mt-[18px]">{label}</label>}
                <input
                    type={type}
                    className={cn(
                        "h-10 w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A3A3A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
InputWithLable.displayName = "InputLabel"

export { InputWithLable };
