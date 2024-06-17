import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import React from "react";

type optionsProps = {
  data: {
    optionTitle: string;
    option: string;
  };
};

const AssecessmentTypeThreeOptions = ({ data }: optionsProps) => {
  return (
    <div className="space-x-2 flex items-center justify-between mb-4">
      <label htmlFor={data.optionTitle} className="flex items-center w-[95%]">
        <span className="text-sm text-black font-inter w-[80px]">
          {data.optionTitle}
        </span>
        <div className="border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
          <div className="flex">
            <span className="px-4 py-3 bg-[#D9D9D9] w-[180px] text-base text-black font-calibri">
              Choose File
            </span>
            <input
              placeholder={data.option}
              className="w-full outline-none px-5 text-base font-calibri text-black"
            />
          </div>
          <Button className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2] me-2">
            <Trash2 width={18} />
          </Button>
        </div>
      </label>
      <div className="w-[5%]">
        <Checkbox className="border border-[#D9D9D9] w-[22px] h-[22px]" />
      </div>
    </div>
  );
};

export default AssecessmentTypeThreeOptions;
