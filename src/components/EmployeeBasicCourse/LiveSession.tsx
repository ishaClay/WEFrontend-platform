import { CalendarDays, Clock } from "lucide-react";
import Zoom_Video from "@/assets/images/zoom-video.png";
import { Button } from "../ui/button";

const LiveSession = () => {
  return (
    <div className="bg-white min-h-[calc(100vh_-_130px)]">
      <div className="md:p-5 p-4">
        <div className="md:pb-5 pb-4">
          <h4 className="xl:text-[28px] md:text-[22px] text-[18px] font-bold font-nunito text-black">
            Wind energy basic course
          </h4>
        </div>
        <div className="border-b border-t border-[#D9D9D9] md:py-5 py-4 mb-5">
          <div className="flex items-center md:gap-5 gap-4">
            <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] rounded-full">
              <img src={Zoom_Video} alt="" className="w-full h-full" />
            </div>
            <div className="md:flex block items-center justify-between w-full">
              <div className="">
                <h5 className="md:text-base text-sm text-black font-bold font-nunito pb-1.5">
                  Live Session(session title)
                </h5>
                <div className="sm:flex block items-center gap-5 md:mb-0 mb-2">
                  <h6 className="flex items-center gap-2 text-xs text-[#777] sm:mb-0 mb-2">
                    <CalendarDays width={20} className="text-[#666666]" /> Date
                    :<span className="text-black">29th March, 2024</span>
                  </h6>
                  <h6 className="flex items-center gap-2 text-xs text-[#777]">
                    <Clock width={20} className="text-[#666666]" /> Time :{" "}
                    <span className="text-black">9:10AM to 12:15AM</span>
                  </h6>
                </div>
              </div>
              <div className="md:text-right text-left">
                <h6 className="text-[#777] text-xs font-nunito pb-2.5">
                  Assign date :
                  <span className="text-black"> 25th March, 2024</span>
                </h6>
                <h6 className="text-[#777] text-xs font-nunito">
                  Planned completed date :
                  <span className="text-black">20th April, 2024</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#00778B1A] xl:h-[450px] sm:h-[425px] h-[380px] w-full rounded-xl flex justify-center items-center">
          <div className="text-center">
            <p className="text-[#313131] sm:text-sm text-xs font-inter mb-5">
              The meeting link will be enabled 15 minutes <br />
              before the scheduled time.
            </p>
            <Button className="bg-[#00778B] text-sm font-inter px-10 sm:h-[42px] h-[36px]">
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
