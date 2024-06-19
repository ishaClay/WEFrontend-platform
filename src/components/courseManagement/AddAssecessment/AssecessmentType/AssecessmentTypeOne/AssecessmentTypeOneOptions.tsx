import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2 } from "lucide-react";

type optionsProps = {
  data: {
    optionTitle: string;
    option: string;
  };
};

const AssecessmentTypeOneOptions = ({ data }: optionsProps) => {
  return (
    <div>
      <div className="">
        <div className="space-x-2 flex items-center justify-between mb-4">
          <label
            htmlFor={data.optionTitle}
            className="flex items-center w-[98%]"
          >
            <span className="text-sm text-black font-inter w-[80px]">
              {data.optionTitle}
            </span>
            <div className="px-4 py-1 border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
              <input
                placeholder={data.option}
                className="w-full outline-none text-base font-calibri text-black"
              />
              <Button className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2]">
                <Trash2 width={18} />
              </Button>
            </div>
          </label>
          <div className="w-[2%] text-right">
            <RadioGroupItem
              value={data?.optionTitle}
              id={data?.optionTitle}
              className="w-[24px] h-[24px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeOneOptions;
