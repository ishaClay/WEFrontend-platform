import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import SelectMenu from "@/components/comman/SelectMenu";
import InputWithLabel from "@/components/comman/InputWithLabel";

interface CourseLogisticProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const CourseLogistic = ({ setStep }: CourseLogisticProps) => {
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Is this course offered on a full-time or part-time basis?
        </h6>
        <div className="mb-[15px]">
          <SelectMenu
            option={[
              {
                label: "Part time",
                value: "Part time",
              },
              {
                label: "Full time",
                value: "Full time",
              },
            ]}
            setValue={() => {
              ("");
            }}
            value={""}
            placeholder="Part Time"
            className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
          />
        </div>
      </div>
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          How is this course delivered? (e.g., Online, In-person, Hybrid)
        </h6>
        <div className="mb-[15px]">
          <SelectMenu
            option={[
              {
                label: "Online",
                value: "Online",
              },
              {
                label: "Offline",
                value: "Offline",
              },
            ]}
            setValue={() => {
              ("");
            }}
            value={""}
            placeholder="Online"
            className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
          />
        </div>
      </div>
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Where is this course physically located? (if applicable)
        </h6>
        <div className="mb-[15px] w-full">
          <InputWithLabel
            type="text"
            placeholder="University Address"
            className="p-4 py-[14px] !text-[#000] placeholder:text-black rounded-md text-base font-calibri"
          />
        </div>
      </div>
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          What is the duration of the course? (e.g., 6 months, 1 year)
        </h6>
        <div className="flex">
          <div className="pe-5">
            <InputWithLabel
              placeholder="6"
              className="border-[#D9D9D9] placeholder:text-black border rounded-md font-calibri text-base px-3 py-[14px]"
            />
          </div>
          <div className="">
            <SelectMenu
              option={[
                {
                  label: "Day",
                  value: "Day",
                },
                {
                  label: "Year",
                  value: "Year",
                },
              ]}
              setValue={() => {
                ("");
              }}
              value={""}
              placeholder="Weeks"
              className="w-[150px] border border-[#D9D9D9] rounded-md py-[14px] h-auto"
              itemClassName="text-[#1D2026] font-calibri"
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button
          type="button"
          onClick={() => setStep((prev) => prev + 1)}
          className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseLogistic;
