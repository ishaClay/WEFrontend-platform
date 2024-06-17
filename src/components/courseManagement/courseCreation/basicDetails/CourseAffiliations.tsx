import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import CourseAffiliationsItems from "./CourseAffiliationsItems";

interface CourseAffiliationsProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const CourseAffiliations = ({ setStep }: CourseAffiliationsProps) => {
  const CourseAffiliationsItem = [
    {
      question:
        "Is this course affiliated with any other institutes or organisation?",
      answer: "Other",
    },
    {
      question: "Provide Institution / organisation Name",
      answer: "Enter Name",
    },
  ];
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        {CourseAffiliationsItem.map((data, index) => {
          return <CourseAffiliationsItems key={index} data={data} />;
        })}
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
