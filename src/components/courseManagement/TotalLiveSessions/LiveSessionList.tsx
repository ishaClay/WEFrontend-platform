import { Button } from "@/components/ui/button";
import { CircleCheck, Copy, Pencil, X } from "lucide-react";

type SessionDetailsProps = {
  data: {
    title: string;
    subTitle: string;
    course: string;
    company: string;
    numberOfEmployee: number;
    startDate: string;
    startTime: string;
    duration: string;
  };
};

const LiveSessionList = ({ data }: SessionDetailsProps) => {
  return (
    <div className="border border-[#D9D9D9] rounded-xl">
      <div className="flex flex-col sm:gap-3 gap-2 sm:p-5 p-4 border-b border-[#D9D9D9]">
        <h6 className="text-base text-black font-abhaya font-semibold">
          {data.title}
        </h6>
        <h6 className="text-base text-black font-abhaya font-semibold">
          {data.subTitle}
        </h6>
        <h6 className="text-base text-black font-abhaya font-semibold">
          <span className="text-[#606060]">Course: </span>
          {data.course}
        </h6>
        <div className="sm:flex bloack gap-10">
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Company: </span>
            {data.company}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold">
            <span className="text-[#606060]">Number of Employee: </span>
            {data.numberOfEmployee}
          </h6>
        </div>
        <div className="sm:flex block gap-10">
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Date: </span>
            {data.startDate}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Time: </span>
            {data.startTime}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold">
            <span className="text-[#606060]">Duration: </span>
            {data.duration}
          </h6>
        </div>
      </div>
      <div className="px-5 py-4 sm:h-[74px] h-auto flex items-center">
        <div className="">
          <div className="flex flex-wrap sm:gap-4 gap-3">
            <Button className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]">
              Start
            </Button>
            <Button className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]">
              <Copy width={20} />
              Copy Invitation
            </Button>
            <Button className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]">
              <Pencil width={20} /> Edit
            </Button>
            <Button className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]">
              <X width={20} />
              Delete
            </Button>
          </div>
        </div>
        <div className="hidden">
          <span className="text-[#58BA66] text-base font-nunito flex gap-3 items-center">
            <CircleCheck width={20} /> Completed Successfully
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionList;
