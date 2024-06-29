import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Arrow_Right from "@/assets/images/Arrow_Right.png";
import { CircleCheck, Eye } from "lucide-react";

type AssignListProps = {
  data: {
    image: string;
    mainTitle: string;
    progressValue: number;
    innerList: {
      title: string;
      employeeName: string;
      profileImg: string;
      date: string;
      status: string;
      action: string;
    }[];
  };
};

const AssignCard = ({ data }: AssignListProps) => {
  return (
    <div className="mb-5">
      <div className="w-full border border-[#D9D9D9] rounded-xl">
        <div className="lg:flex block items-center justify-between w-full sm:px-5 px-3 py-3">
          <div className="flex items-center sm:gap-5 gap-3 lg:pb-0 pb-3">
            <div className="bg-white drop-shadow-md sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
              <img src={data.image} alt="Leaf Icon" className="w-auto" />
            </div>
            <h5 className="text-[#1D2026] font-Calibri font-bold sm:text-base text-sm">
              {data.mainTitle}
            </h5>
          </div>
          <div className="bg-[#E3E5F5] h-[20px] xl:w-[511px] w-[290px] rounded-full">
            <Progress
              value={data.progressValue}
              color="#FFD56A"
              className="w-full rounded-full h-[20px]"
            />
          </div>
          <div className="flex items-center relative lg:mt-0 mt-3">
            <Button className="text-black sm:text-base text-xs font-Calibri rounded-full bg-[#FFD56A] h-[30px]">
              Intermediate
            </Button>
            <div className="relative border border-dashed border-[#A6A6A6] w-40">
              <img
                src={Arrow_Right}
                alt="Arrow"
                className="absolute bottom-0 top-0 left-0 right-0 m-auto"
              />
            </div>
            <Button className="text-white sm:text-base text-xs rounded-full bg-[#2C9367] h-[30px]">
              Advanced
            </Button>
          </div>
        </div>
        <div className="sm:flex block items-center sm:px-5 p-3 sm:py-2.5 justify-between w-full border-t border-[#D9D9D9]">
          <p className="font-Calibri text-black text-base sm:pb-0 pb-2.5">
            Lead in energy efficiency through continuous optimization and
            strategic energy management.
          </p>
          <div className="sm:text-right text-left sm:block flex sm:gap-0 gap-2.5 items-center">
            <Button className="bg-[#FFD56A] text-sm font-calibri text-black rounded-full h-[28px] px-2 w-[66px] sm:mb-2.5 mb-0">
              On time
            </Button>
            <Button className="bg-[#00778B] text-white rounded-md text-sm h-[32px] px-2 flex items-center w-[75px]">
              <BsPencilFill width={16} className="w-full" /> Assign
            </Button>
          </div>
        </div>
        {data.innerList.map((item, index) => {
          return (
            <div
              key={index}
              className="sm:flex block items-center justify-between border-t border-[#D9D9D9] sm:px-5 sm:py-3.5 p-3"
            >
              <div className="flex">
                <div className="flex flex-col gap-2.5">
                  <p className="text-black font-calibri text-base">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 overflow-hidden rounded-full">
                      <img src={item.profileImg} alt="" />
                    </div>
                    <h6 className="text-black font-calibri text-base">
                      {item.employeeName}
                    </h6>
                  </div>
                  <div className="sm:pb-0 pb-2.5">
                    <h6 className="sm:text-sm text-xs text-[#00000099] font-nunito flex items-center">
                      <MdOutlineCalendarMonth className="h-[20px] w-[20px] text-[#666666] me-2" />
                      Date:
                      <span className="text-black ps-2">{item.date}</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="sm:text-right text-left sm:block flex sm:gap-0 gap-2.5 items-center">
                {item.status === "ontime" && (
                  <Button className="bg-[#FFD56A] h-[28px] px-2 w-[66px] text-black rounded-full py-1 text-xs sm:mb-2.5 mb-0">
                    On time
                  </Button>
                )}
                {item.status === "delay" && (
                  <Button className="bg-[#F63636] h-[28px] px-2 w-[66px] text-white rounded-full py-1 text-xs sm:mb-2.5 mb-0">
                    Delay
                  </Button>
                )}

                {item.action === "edit" && (
                  <Button className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]">
                    <BsPencilFill />
                    Edit
                  </Button>
                )}

                {item.action === "view" && (
                  <div className="flex gap-3 items-center">
                    <Button className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]">
                      <Eye width={18} />
                      view
                    </Button>

                    <Button className="bg-transparent text-[#58BA66] text-base font-nunito font-semibold flex items-center px-2.5">
                      <CircleCheck width={20} /> Completed
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignCard;
