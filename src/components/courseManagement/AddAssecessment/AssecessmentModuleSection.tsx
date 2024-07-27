import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEYS } from "@/lib/constants";
import { getTotalDuration } from "@/lib/utils";
import { getModuleSection } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";

interface AssecessmentModuleSectionProps {
  createAssecessment: any;
  setCreateAssecessment: React.Dispatch<React.SetStateAction<object>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
}

const AssecessmentModuleSection = ({
  createAssecessment,
  setCreateAssecessment,
  errors,
  setErrors,
}: AssecessmentModuleSectionProps) => {
  const moduleId = new URLSearchParams(window.location.search).get("moduleId");

  const { data: moduleSection } = useQuery({
    queryKey: [QUERY_KEYS.fetchModuleSection],
    queryFn: () => getModuleSection(moduleId as string),
  });

  const sectionOption = [
    ...(moduleSection?.data?.data?.moduleLiveSection ?? []),
    ...(moduleSection?.data?.data?.moduleSection ?? []),
  ];

  const getTotalSectionsTime = moduleSection?.data?.data?.moduleSection?.map(
    (it: any) => it?.readingTime
  );
  const totalTimeInSeconds = getTotalDuration(getTotalSectionsTime);

  // Convert total seconds back to hours, minutes, seconds
  const hours = Math.floor(totalTimeInSeconds / 3600)
    ?.toString()
    ?.padStart(2, "0");
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60)
    ?.toString()
    ?.padStart(2, "0");
  const seconds = (totalTimeInSeconds % 60)?.toString()?.padStart(2, "0");

  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <h3 className="text-base font-bold font-calibri pb-2">
        Module: Chapter 1 - Intro
      </h3>
      <div className="flex items-center mb-5">
        <h6 className="text-xs text-[#313131] font-inter pe-4">
          Section : {moduleSection?.data?.data?.moduleSection?.length || 0}
        </h6>
        <h6 className="text-xs text-[#313131] font-inter flex items-center">
          <Dot />
          <strong className="text-black me-2">
            {+hours > 0 ? hours : "00"}:{+minutes > 0 ? minutes : "00"}:
            {+seconds > 0 ? seconds : "00"} Seconds
          </strong>{" "}
          Reading
        </h6>
      </div>

      <div className="mb-5">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Select Section
        </h6>
        <Select
          onValueChange={(e) => {
            setCreateAssecessment({ ...createAssecessment, moduleSection: e });
            setErrors({ ...errors, moduleSection: "" });
          }}
          value={createAssecessment?.moduleSection}
        >
          <SelectTrigger className="w-full border-[#D9D9D9] rounded-md text-base font-calibri px-4 py-4">
            <SelectValue placeholder="How to manage financial management?" />
          </SelectTrigger>
          <SelectContent>
            {sectionOption?.map((item) => (
              <SelectItem
                value={item?.id?.toString()}
                className="font-base font-calibri text-[#1D2026]"
              >
                {item?.liveSecTitle || item?.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.moduleSection && (
          <p className="text-red-500 text-sm">{errors.moduleSection}</p>
        )}
      </div>
      <div className="mb-5">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Assessment Title
        </h6>
        <div className="border border-[#D9D9D9] rounded-md p-3 me-5 flex justify-between items-center">
          <input
            className="border-none w-full outline-none text-sm text-black"
            placeholder="Assessment Title"
            type="text"
            value={createAssecessment?.title}
            onChange={(e) => {
              setCreateAssecessment({
                ...createAssecessment,
                title: e.target.value,
              });
              setErrors((prev: any) => ({ ...prev, title: "" }));
            }}
          />
        </div>
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
                value={createAssecessment?.passingPercentage}
                placeholder="35%"
                type="number"
                onChange={(e) => {
                  setCreateAssecessment({
                    ...createAssecessment,
                    passingPercentage: e.target.value,
                  });
                  setErrors((prev: any) => ({
                    ...prev,
                    passingPercentage: "",
                  }));
                }}
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri pb-3">
              Time Bound
            </h6>
            <div className="rounded-md p-3 me-5 flex justify-between items-center">
              <RadioGroup
                value={createAssecessment?.timeBound?.toString()}
                className="flex"
                onValueChange={(value: any) => {
                  if (value === "0") {
                    setCreateAssecessment((prev) => ({
                      ...prev,
                      timeDuration: "0",
                      timeBound: +value,
                    }));
                  } else if (value === "1") {
                    setCreateAssecessment({
                      ...createAssecessment,
                      timeBound: +value,
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"0"}
                    id="option-one"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-sm text-black font-inter">No</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"1"}
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
                disabled={!+createAssecessment?.timeBound}
                onChange={(e) => {
                  setCreateAssecessment((prev) => ({
                    ...prev,
                    timeDuration: e.target.value,
                  }));
                  setErrors((prev: any) => ({ ...prev, timeDuration: "" }));
                }}
                value={createAssecessment?.timeDuration}
              />
              <h6 className="text-sm text-[#A3A3A3] font-calibri">Hours</h6>
            </div>
          </div>
        </div>
        {errors.passingPercentage && (
          <p className="text-red-500 text-sm">{errors.passingPercentage}</p>
        )}
        {errors.timeDuration && (
          <p className="text-red-500 text-sm">{errors.timeDuration}</p>
        )}
      </div>
    </div>
  );
};

export default AssecessmentModuleSection;
