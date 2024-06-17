import InputWithLabel from "@/components/comman/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import CourseSpecificationsQuestionsItems from "./CourseSpecificationsQuestionsItems";

interface CourseSpecifications {
  setStep: Dispatch<SetStateAction<number>>;
}

const CourseSpecifications = ({ setStep }: CourseSpecifications) => {
  const courseSpecificationsQuestion = [
    {
      question: "Specify the NFQ level for this course (if applicable).",
      answer: "NQF Level 4",
    },
    {
      question: "How many ECTS credits does this course offer?",
      answer: "60 Credits",
    },
    {
      question: "How many FET credits does this course offer? ",
      answer: "60 Credits",
    },
    {
      question:
        "What type of certificate or award will participants receive upon completion?",
      answer:
        "Post Graduate Degree or Diploma, Certificate, Professional Diploma",
    },
  ];
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        {courseSpecificationsQuestion.map((data, index) => {
          return <CourseSpecificationsQuestionsItems key={index} data={data} />;
        })}
        <div className="mb-[18px]">
          <InputWithLabel
            label="How many ECTS credits does this course offer?"
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="60 Credits"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            // {...register("title")}
            // error={errors.title?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="How many FET credits does this course offer?"
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="60 Credits"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            // {...register("title")}
            // error={errors.title?.message as string}
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

export default CourseSpecifications;
