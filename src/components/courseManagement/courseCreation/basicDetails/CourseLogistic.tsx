import { Button } from "@/components/ui/button";
import CourseLogisticItems from "./CourseLogisticItems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourseLogistic = () => {
  const courseLogisticItems = [
    {
      question: "Is this course offered on a full-time or part-time basis?",
      answer: "Part Time",
    },
    {
      question:
        "How is this course delivered? (e.g., Online, In-person, Hybrid)",
      answer: "Online",
    },
    {
      question: "Where is this course physically located? (if applicable)",
      answer: "University Address",
    },
  ];

  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        {courseLogisticItems.map((data, index) => {
          return <CourseLogisticItems key={index} data={data} />;
        })}
      </div>
      <div className="">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          What is the duration of the course? (e.g., 6 months, 1 year)
        </h6>
        <div className="flex">
          <div className="pe-5">
            <input
              placeholder="6"
              className="border-[#D9D9D9] border rounded-md font-calibri text-base px-3 py-2"
            />
          </div>
          <div className="">
            <Select>
              <SelectTrigger className="w-[150px] border border-[#D9D9D9] rounded-md">
                <SelectValue placeholder="Weeks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" className="text-[#1D2026] font-calibri">
                  1
                </SelectItem>
                <SelectItem value="2" className="text-[#1D2026] font-calibri">
                  2
                </SelectItem>
                <SelectItem value="3" className="text-[#1D2026] font-calibri">
                  3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseLogistic;
