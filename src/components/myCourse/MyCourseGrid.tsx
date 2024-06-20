import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import SpeedImage from "@/assets/images/Speed.png";
import GraduationCapImage from "@/assets/images/Graduationcap.png";
import ClockImage from "@/assets/images/Clock.png";
import InternetImage from "@/assets/images/Internet.png";
import TimesheetImage from "@/assets/images/Timesheet.png";
import UniversityImage from "@/assets/images/University.png";

type myPagesListProps = {
  grid: {
    image: string;
    title: string;
  };
};

const MyCourseGrid = ({ grid }: myPagesListProps) => {
  return (
    <div>
      <div className="border border-solid border-[#D9D9D9] rounded-lg col-span-1 group">
        <div className="relative overflow-hidden rounded-t-lg">
          <img src={grid.image} alt="" className="h-[231px] w-full" />
          <div className="absolute bottom-4 right-4 rounded-full lg:invisible visible group-hover:visible">
            <Button className="bg-[#00778B] text-white font-bold font-calibri  text-base rounded-lg shadow py-[12px] px-[22px]">
              Continue
            </Button>
          </div>
        </div>
        <div className="xl:p-5 p-4 pt-4">
          <div>
            <p className="text-base font-medium font-inter leading-6 mb-2 line-clamp-1">
              {grid.title}
            </p>
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
          <div className="flex flex-wrap justify-between pt-4">
            <Badge className="bg-[#FFD56A] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 py-[4px] px-[10px] my-1 mx-[2px] hover:text-white">
              Environmental
            </Badge>
            <Badge className="bg-[#FFD56A] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 py-[4px] px-[10px] my-1 mx-[2px] hover:text-white">
              Governance
            </Badge>
            <Badge className="bg-[#D6F5AC] text-[#3A3A3A] font-normal font-Poppins text-xs leading-4 py-[4px] px-[10px] my-1 mx-[2px] hover:text-white">
              Social
            </Badge>
          </div>
          <div className="flex items-center xl:gap-5 gap-8 pt-3">
            <div>
              <div className="flex items-center">
                <img src={SpeedImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  Level- Advanced
                </p>
              </div>
              <div className="flex items-center">
                <img src={ClockImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  Full Time
                </p>
              </div>
              <div className="flex items-center">
                <img src={TimesheetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  2 Years
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <img src={GraduationCapImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  Post Graduate Diploma
                </p>
              </div>
              <div className="flex items-center">
                <img src={InternetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  Online
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
      </div>
    </div>
  );
};

export default MyCourseGrid;
