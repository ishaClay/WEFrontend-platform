import { CircleAlert } from "lucide-react";

type moduleCourseCardProps = {
  data: {
    moduleName: string;
    sectionId: number;
    duration: string;
  };
};

const ModuleCardList = ({ data }: moduleCourseCardProps | any) => {
  console.log("datadatadatadatadatadata", data);
  
  return (
    <div className="">
      <h3 className="sm:text-base text-sm font-bold font-calibri pb-2 text-left flex items-center">
        <CircleAlert className="me-2 text-[#747474]" />
        {data?.title}
      </h3>
      <div className="flex items-center">
        <h6 className="text-xs text-[#747474] font-inter pe-3 me-3 border-e border-[#747474]">
          Section: {data.moduleSections?.length}
        </h6>
        <h6 className="text-xs text-[#747474] font-inter">
          Duration {data.duration}
        </h6>
      </div>
    </div>
  );
};

export default ModuleCardList;
