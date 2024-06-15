import { Button } from "@/components/ui/button";
import CourseAffiliationsItems from "./CourseAffiliationsItems";

const CourseAffiliations = () => {
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
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseAffiliations;
