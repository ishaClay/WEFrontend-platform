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
