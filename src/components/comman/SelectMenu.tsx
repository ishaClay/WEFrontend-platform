import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  placeholder?: string;
  option: {
    label: string;
    value: string;
  }[];
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((e: string) => void);
  value: string;
  itemClassName?: string;
  containClassName?: string;
}

const SelectMenu: FC<IProps> = ({
  className,
  placeholder,
  option,
  setValue,
  value,
  itemClassName,
  containClassName,
}) => {
  return (
    <Select onValueChange={(e) => setValue(e)} value={value} defaultValue={value}>
      <SelectTrigger className={`bg-white outline-none ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={cn(`bg-white max-h-[250px] overflow-auto`, containClassName)}
      >
        {option.map((item, index: number) => (
          <SelectItem
            key={index}
            value={item.value}
            className={`font-calibri ${itemClassName}`}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
