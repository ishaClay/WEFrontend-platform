import { Dot } from "lucide-react";

type CourseViewCardProps = {
  data: {
    moduleName: string;
    sectionId: number;
    reading: string;
  };
};
const CourseViewCardList = ({ data }: CourseViewCardProps) => {
  return (
    <div className="">
      <h3 className="text-base font-bold font-calibri pb-2">
        Module: {data.moduleName}
      </h3>
      <div className="flex items-center">
        <h6 className="text-xs text-[#313131] font-inter pe-4">
          Section: {data.sectionId}
        </h6>
        <h6 className="text-xs text-[#313131] font-inter flex items-center">
          <Dot />
          {data.reading}
        </h6>
      </div>
    </div>
  );
};

export default CourseViewCardList;
