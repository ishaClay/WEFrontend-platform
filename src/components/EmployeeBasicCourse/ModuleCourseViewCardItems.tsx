import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type moduleCourseCardListProps = {
  list: {
    image: string;
    moduleName: string;
    durationType: string;
    duration: string;
    date: string;
    time: string;
    status: string;
  };
};

const ModuleCourseViewCardItems = ({ list }: moduleCourseCardListProps) => {
  const navigate = useNavigate();
  return (
    <div className="border-b border-[#D9D9D9] px-0 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          <img src={list.image} alt="" />
        </div>
        <div className="">
          <h5 className="sm:text-base text-sm text-black font-nunito pb-2">
            {list.moduleName}
          </h5>
          <div className="pb-1">
            <h6 className="text-[#747474] text-xs font-nunito">
              {list.durationType} {list.duration}
            </h6>
          </div>
          <div className="sm:flex block items-center">
            <h6 className="text-[#747474] text-xs font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
              Date : {list.date}
            </h6>
            <h6 className="text-[#747474] text-xs font-nunito">
              Time : {list.time}
            </h6>
          </div>
        </div>
      </div>
      <div className="">
        {list.status === "live" && (
          <Button
            className="bg-[#00778B] xl:h-12 sm:h-9 h-8 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
            onClick={() => navigate("/employee/live-session")}
          >
            Join
          </Button>
        )}
        {list.status === "completed" && (
          <Button className="bg-[#64A70B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            Completed
          </Button>
        )}
        {list.status === "inprogress" && (
          <Button className="bg-[#FFD56A] text-black xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            In Progress
          </Button>
        )}
        {list.status === "start" && (
          <Button className="bg-[#00778B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModuleCourseViewCardItems;
