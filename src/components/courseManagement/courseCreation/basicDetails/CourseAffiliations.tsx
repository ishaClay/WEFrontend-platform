import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface CourseAffiliationsProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const CourseAffiliations = ({ setStep }: CourseAffiliationsProps) => {
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Is this course affiliated with any other institutes or organisation?
        </h6>
        <div className="mb-[15px]">
          <SelectMenu
            option={[
              {
                label: "text1",
                value: "text1",
              },
              {
                label: "text2",
                value: "text2",
              },
            ]}
            setValue={() => {
              ("");
            }}
            value={""}
            placeholder="Other"
            className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
          />
        </div>
      </div>
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          Provide Institution / organisation Name
        </h6>
        <div className="mb-[15px]">
          <SelectMenu
            option={[
              {
                label: "Enter Email",
                value: "Enter Email",
              },
              {
                label: "Enter Number",
                value: "Enter Number",
              },
            ]}
            setValue={() => {
              ("");
            }}
            value={""}
            placeholder="Enter Name"
            className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
          />
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

export default CourseAffiliations;
