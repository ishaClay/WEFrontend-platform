import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEYS } from "@/lib/constants";
import { getModuleSection } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import { useState } from "react";

const AssecessmentModuleSection = () => {
  const moduleId = new URLSearchParams(window.location.search).get("moduleId");

  const [timeBound, setTimeBound] = useState("false");

  const { data: moduleSection } = useQuery({
    queryKey: [QUERY_KEYS.fetchModuleSection],
    queryFn: () => getModuleSection(moduleId as string),
  });

  const sectionOption = [
    ...(moduleSection?.data?.data?.moduleLiveSection ?? []),
    ...(moduleSection?.data?.data?.moduleSection ?? []),
  ];

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
            {sectionOption?.map((item) => (
              <SelectItem
                value={item?.id}
                className="font-base font-calibri text-[#1D2026]"
              >
                {item?.liveSecTitle || item?.title}
              </SelectItem>
            ))}
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
              <RadioGroup
                defaultValue={"false"}
                className="flex"
                onValueChange={(value: any) => setTimeBound(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"false"}
                    id="option-one"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-sm text-black font-inter">No</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"true"}
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
                disabled={timeBound === "false"}
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
