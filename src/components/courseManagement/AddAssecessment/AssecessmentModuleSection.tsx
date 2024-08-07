import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUERY_KEYS } from "@/lib/constants";
import { getTotalDuration } from "@/lib/utils";
import { getModuleSection } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import { useEffect } from "react";

interface AssecessmentModuleSectionProps {
  createAssecessment: any;
  setCreateAssecessment: React.Dispatch<
    React.SetStateAction<{
      title: string;
      passingPercentage: string;
      timeBound: number;
      timeDuration: {
        hours: number;
        minutes: number;
        seconds: number;
      };
    }>
  >;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const AssecessmentModuleSection = ({
  createAssecessment,
  setCreateAssecessment,
  errors,
  setErrors,
  data,
}: AssecessmentModuleSectionProps) => {
  const moduleId = new URLSearchParams(window.location.search).get("moduleId");

  console.log("errors", errors);

  useEffect(() => {
    if (data && data?.moduleSection) {
      setCreateAssecessment({
        title: data?.title,
        passingPercentage: data?.passingPercentage,
        timeBound: +data?.timeBound,
        timeDuration: {
          hours: data?.timeDuration?.hours,
          minutes: data?.timeDuration?.minutes,
          seconds: data?.timeDuration?.seconds,
        },
      });
    }
  }, [data, setCreateAssecessment]);

  console.log("data++++++++++++", data);

  const { data: moduleSection } = useQuery({
    queryKey: [QUERY_KEYS.fetchModuleSection],
    queryFn: () => getModuleSection(moduleId as string),
  });

  console.log("moduleSection", moduleSection);

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
console.log("errors", errors);

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
          Assessment Title
        </h6>
        <div className="border border-[#D9D9D9] rounded-md p-3 me-5 flex justify-between items-center">
          <input
            className="border-none w-full outline-none text-sm text-black"
            placeholder="Assessment Title"
            type="text"
            value={createAssecessment?.title}
            onChange={(e) => {
              setCreateAssecessment((prev) => ({
                ...prev,
                title: e.target.value,
              }));
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
            <div className="border border-[#D9D9D9] rounded-md p-3 w-[150px] me-5 flex justify-between items-center">
              <input
                className="border-none w-full outline-none text-sm text-black"
                value={createAssecessment?.passingPercentage}
                placeholder="passing percentage"
                type="text"
                min={0}
                onChange={(e) => {
                  setCreateAssecessment((prev) => ({
                    ...prev,
                    passingPercentage: e.target.value,
                  }));
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
                      timeDuration: {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                      },
                      timeBound: +value,
                    }));
                  } else if (value === "1") {
                    setCreateAssecessment((prev) => ({
                      ...prev,
                      timeBound: +value,
                    }));
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
            <div className="flex items-center gap-4">
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                <input
                  className="border-none w-full outline-none text-sm text-black"
                  placeholder="00"
                  disabled={!+createAssecessment?.timeBound}
                  onChange={(e) => {
                    setCreateAssecessment((prev) => ({
                      ...prev,
                      timeDuration: {
                        ...prev?.timeDuration,
                        hours: +e.target.value,
                      },
                    }));
                    setErrors((prev: any) => ({ ...prev, timeDuration: "" }));
                  }}
                  value={createAssecessment?.timeDuration?.hours || 0}
                />
                <h6 className="text-sm text-[#A3A3A3] font-calibri pl-3">Hours</h6>
              </div>
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                <input
                  className="border-none w-full outline-none text-sm text-black"
                  placeholder="00"
                  disabled={!+createAssecessment?.timeBound}
                  onChange={(e) => {
                    setCreateAssecessment((prev) => ({
                      ...prev,
                      timeDuration: {
                        ...prev?.timeDuration,
                        minutes: +e.target.value,
                      },
                    }));
                    setErrors((prev: any) => ({ ...prev, timeDuration: "" }));
                  }}
                  value={createAssecessment?.timeDuration?.minutes || 0}
                />
                <h6 className="text-sm text-[#A3A3A3] font-calibri pl-3">Minutes</h6>
              </div>
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                <input
                  className="border-none w-full outline-none text-sm text-black"
                  placeholder="00"
                  disabled={!+createAssecessment?.timeBound}
                  onChange={(e) => {
                    setCreateAssecessment((prev) => ({
                      ...prev,
                      timeDuration: {
                        ...prev?.timeDuration,
                        seconds: +e.target.value,
                      },
                    }));
                    setErrors((prev: any) => ({ ...prev, timeDuration: "" }));
                  }}
                  value={createAssecessment?.timeDuration?.seconds || 0}
                />
                <h6 className="text-sm text-[#A3A3A3] font-calibri pl-3">Secound</h6>
              </div>
            </div>
            {errors.timeDuration && (
              <p className="text-red-500 text-sm">{errors.timeDuration}</p>
            )}
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
