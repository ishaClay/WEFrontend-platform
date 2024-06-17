import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
}

const SelectMenu: FC<IProps> = ({
  className,
  placeholder,
  option,
  setValue,
  value,
  itemClassName,
}) => {
  return (
    <Select onValueChange={(e) => setValue(e)} value={value}>
      <SelectTrigger className={`bg-white outline-none ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {option.map((item, index: number) => (
          <SelectItem
            key={index}
            value={item.value}
            className={`${itemClassName}`}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
