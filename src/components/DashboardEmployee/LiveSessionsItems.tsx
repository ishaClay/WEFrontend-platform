import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Button } from "../ui/button";

type liveSessionItemsProps = {
  data: {
    image: string;
    title: string;
    subTitle: string;
    date: string;
    time: string;
  };
};

const LiveSessionsItems = ({ data }: liveSessionItemsProps) => {
  return (
    <div className="col-span-1 md:p-5 p-4 shadow rounded-md sm:m-0 m-1">
      <div className="flex items-center">
        <div className="">
          <div className="rounded-md overflow-hidden min-w-20 min-h-20 w-20 h-20">
            <img src={data.image} alt="img" className="h-full" />
          </div>
          <Button className="bg-transparent text-sm hover:bg-transparent text-[#00778B] font-bold p-0">
            JOIN <ArrowRight width={18} />
          </Button>
        </div>
        <div className="md:ps-5 ps-3">
          <h5 className="md:text-base text-sm font-medium font-inter text-[#1D2026] pb-2">
            {data.title}
          </h5>
          <h6 className="text-[#1D2026] md:text-sm text-xs font-normal font-inter pb-2">
            {data.subTitle}
          </h6>
          <h6 className="flex items-center text-xs text-[#666666] pb-1">
            <CalendarDays width={14} />
            Date: <span className="text-black">{data.date}</span>
          </h6>
          <h6 className="flex items-center text-xs text-[#666666]">
            <Clock width={14} />
            Time: <span className="text-black">{data.time}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionsItems;
