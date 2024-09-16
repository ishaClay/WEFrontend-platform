import React from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type SearchBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};
const SearchBox = ({ containerClassName, ...props }: SearchBoxProps) => {
  return (
    <div
      className={cn(
        "flex items-center xl:w-[550px] sm:w-[480px] w-[300px] sm:h-[52px] h-11 relative",
        containerClassName
      )}
    >
      <BsSearch className="text-[#D9D9D9] absolute left-4" />
      <Input
        type="search"
        className="pr-4 pl-10 py-2 h-full text-sm placeholder-[#D9D9D9]"
        {...props}
      />
    </div>
  );
};

export default SearchBox;
