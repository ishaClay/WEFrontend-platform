import SpeedImage from "@/assets/images/Speed.png";
import GraduationCapImage from "@/assets/images/Graduationcap.png";
import ClockImage from "@/assets/images/Clock.png";
import InternetImage from "@/assets/images/Internet.png";
import TimesheetImage from "@/assets/images/Timesheet.png";
import UniversityImage from "@/assets/images/University.png";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type myPagesListProps = {
  list: {
    image: string;
    title: string;
  };
};

const MyCourseList = ({ list }: myPagesListProps) => {
  return (
    <div className="border border-solid gap-1 border-[#D9D9D9] rounded-lg group flex items-end sm:justify-between justify-center xl:p-5 sm:p-4 p-0 mb-5 xl:flex-nowrap flex-wrap">
      <div className="flex sm:flex-nowrap flex-wrap sm:justify-start justify-center items-center xl:gap-5 gap-3">
        <div className="overflow-hidden rounded-lg sm:min-h-[152px] sm:min-w-[152px] sm:w-[152px] sm:h-[152px] w-full">
          <img src={list.image} alt="" className="w-full h-full" />
        </div>
        <div className="w-full sm:p-0 px-4">
          <p className="sm:text-base text-sm font-medium font-inter leading-6 mb-[10px] line-clamp-1">
            {list.title}
          </p>
          <div className="flex flex-wrap md:gap-5 sm:gap-2 gap-1 pb-[10px]">
            <Badge className="bg-[#FFD56A] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 sm:px-[10px] px-[5px] my-1 mx-[2px] hover:text-white">
              Environmental
            </Badge>
            <Badge className="bg-[#FFD56A] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 sm:px-[10px] px-[5px] my-1 mx-[2px] hover:text-white">
              Governance
            </Badge>
            <Badge className="bg-[#D6F5AC] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 sm:px-[10px] px-[5px] my-1 mx-[2px] hover:text-white">
              Social
            </Badge>
          </div>
          <div className="flex items-center justify-between pb-[6px]">
            <div className="text-xl font-calibri leading-6 text-[#00778B] font-bold">
              {25}%
            </div>
            <div className="text-xs font-normal font-calibri leading-4">
              2 of 5 Completed
            </div>
          </div>
          <div className="bg-[#E8E8E8] rounded-lg">
            <div
              className="h-[8px] bg-[#00778B] text-white rounded-lg text-[10px] text-center"
              style={{ width: "25%" }}
            />
          </div>
          <div className="flex flex-wrap items-center 2xl:gap-6 sm:gap-3 gap-2 pt-[10px]">
            <div className="flex items-center">
              <img src={SpeedImage} alt="" className="h-[16] w-[18px]" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                Level- Advanced
              </p>
            </div>
            <div className="flex items-center">
              <img src={GraduationCapImage} alt="" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                Post Graduate Diploma
              </p>
            </div>
            <div className="flex items-center">
              <img src={ClockImage} alt="" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                Full Time
              </p>
            </div>
            <div className="flex items-center">
              <img src={InternetImage} alt="" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                Online
              </p>
            </div>
            <div className="flex items-center">
              <img src={TimesheetImage} alt="" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                2 Years
              </p>
            </div>
            <div className="flex items-center">
              <img src={UniversityImage} alt="" />
              <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                Atlantic Technological University
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-0 ml-auto sm:mb-0 mb-4">
        <Button className="bg-[#00778B] text-white font-bold font-calibri sm:me-0 me-4 sm:text-base text-sm rounded-md shadow py-[12px] px-[24px] h-auto">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MyCourseList;
