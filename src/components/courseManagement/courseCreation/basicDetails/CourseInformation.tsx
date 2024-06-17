import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dispatch, SetStateAction } from "react";
import BasicDetailsItems from "./BasicDetailsItems";

interface CourseInformationProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const CourseInformation = ({ setStep }: CourseInformationProps) => {
  const basicDetails = [
    {
      qestion: "What is the title of the course you're offering?",
      answer:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      qestion: "Please enter the name of the institute providing this course.",
      answer: "Atlantic Technological University",
    },
    {
      qestion:
        "Provide a direct link to the course details on your institute's website.",
      answer: "www.atlanticTechnologicalUniversity.com",
    },
    {
      qestion:
        "Do you have any additional links for course materials or resources? (Optional)",
      answer: "www.atlanticTechnologicalUniversity.com",
    },
  ];
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        {basicDetails.map((data, index) => {
          return <BasicDetailsItems key={index} data={data} />;
        })}
      </div>
      <div className="flex pb-7">
        <div className="flex items-center pe-5 xl:w-[200px]">
          <span className="pe-3 font-calibri text-base text-black">
            Free Course?
          </span>
          <Switch />
        </div>
        <div className="flex items-center">
          <span className="pe-3 font-calibri text-base text-[#515151] xl:w-[130px]">
            Course Price
          </span>
          <input
            placeholder="€50.00"
            className="w-[190px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
          />
        </div>
      </div>

      <div className="flex pb-7">
        <div className="flex items-center pe-5 xl:w-[200px]">
          <span className="pe-3 font-calibri text-base text-black">
            Discount provided?
          </span>
          <Switch />
        </div>
        <div className="flex items-center">
          <span className="pe-3 font-calibri text-base text-[#515151] xl:w-[130px]">
            Discounted Price
          </span>
          <input
            placeholder="€255"
            className="w-[190px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
          />
        </div>
      </div>

      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Discount provided by
        </h6>
        <input
          placeholder="Select Skillnet"
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
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

export default CourseInformation;
