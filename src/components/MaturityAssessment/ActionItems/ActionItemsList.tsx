import { Button } from "@/components/ui/button";
import { CircleCheck, Eye } from "lucide-react";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";

type ActionItemsProps = {
  data: {
    taskName: string;
    date: string;
    status: string;
    action: string;
  };
};

const ActionItemsList = ({ data }: ActionItemsProps) => {
  return (
    <div className="sm:flex block items-center justify-between last:border-none border-b border-[#D9D9D9] sm:p-5 p-3 ">
      <div className="flex flex-col sm:gap-3 gap-2">
        <h5>{data.taskName}</h5>
        <h6 className="sm:text-sm text-xs text-[#00000099] font-nunito flex items-center xl:mb-0 mb-2">
          <MdOutlineCalendarMonth className="h-[20px] w-[20px] text-[#666666] me-2" />
          Date:
          <span className="text-black ps-2">{data.date}</span>
        </h6>
      </div>
      <div className="sm:text-right text-left sm:block flex sm:gap-0 gap-2.5 items-center">
        {data.status === "ontime" && (
          <Button className="bg-[#FFD56A] h-[28px] px-2 w-[66px] text-black rounded-full py-1 text-xs sm:mb-2.5 mb-0">
            On time
          </Button>
        )}
        {data.status === "delay" && (
          <Button className="bg-[#F63636] h-[28px] px-2 w-[66px] text-white rounded-full py-1 text-xs sm:mb-2.5 mb-0">
            Delay
          </Button>
        )}

        {data.action === "edit" && (
          <Button className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]">
            <BsPencilFill />
            Edit
          </Button>
        )}

        {data.action === "view" && (
          <div className="flex gap-3 items-center">
            <Button className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]">
              <Eye width={18} />
              view
            </Button>

            <Button className="bg-transparent text-[#58BA66] sm:text-base text-sm font-nunito font-semibold flex items-center sm:px-2.5 px-0">
              <CircleCheck width={20} /> Completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionItemsList;
