import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dot } from "lucide-react";

const AssecessmentModuleSection = () => {
  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <h3 className="text-base font-bold font-calibri pb-2">
        Module: Chapter 1 - Intro
      </h3>
      <div className="flex items-center mb-5">
        <h6 className="text-xs text-[#313131] font-inter pe-4">Section : 3</h6>
        <h6 className="text-xs text-[#313131] font-inter flex items-center">
          <Dot />
          <strong className="text-black me-2">50m</strong> Reading
        </h6>
      </div>

      <div className="mb-5">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Select Section
        </h6>
        <Select>
          <SelectTrigger className="w-full border-[#D9D9D9] rounded-md text-base font-calibri px-4 py-4">
            <SelectValue placeholder="How to manage financial management?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="item_1"
              className="font-base font-calibri text-[#1D2026]"
            >
              How to manage financial management?
            </SelectItem>
            <SelectItem
              value="item_2"
              className="font-base font-calibri text-[#1D2026]"
            >
              How to manage financial management? 1
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-5">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Assessment Title
        </h6>
        <Select>
          <SelectTrigger className="w-full border-[#D9D9D9] rounded-md text-base font-calibri px-4 py-4">
            <SelectValue placeholder="Assessment One" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="item_1"
              className="font-base font-calibri text-[#1D2026]"
            >
              Assessment One
            </SelectItem>
            <SelectItem
              value="item_2"
              className="font-base font-calibri text-[#1D2026]"
            >
              Assessment One 1
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <div className="flex">
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri pb-3">
              Passing Percentage
            </h6>
            <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
              <input
                className="border-none w-full outline-none text-sm text-black"
                placeholder="35%"
                type="number"
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri pb-3">
              Time Bound
            </h6>
            <div className="rounded-md p-3 me-5 flex justify-between items-center">
              <RadioGroup defaultValue="option-one" className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-one"
                    id="option-one"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-sm text-black font-inter">No</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-two"
                    id="option-two"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-sm text-black font-inter">Yes</span>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri pb-3">
              Duration
            </h6>
            <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
              <input
                className="border-none w-full outline-none text-sm text-black"
                placeholder="01"
              />
              <h6 className="text-sm text-[#A3A3A3] font-calibri">Hours</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssecessmentModuleSection;
