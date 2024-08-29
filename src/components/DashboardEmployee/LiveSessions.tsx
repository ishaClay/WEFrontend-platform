import { getUpcommingLiveSession } from "@/services/apiServices/dashboard";
import { EmployeeDashboardResponse } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import CustomCarousel from "../comman/CustomCarousel";
import { Button } from "../ui/button";
import LiveSessionsItems from "./LiveSessionsItems";

const LiveSessions = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useQuery<EmployeeDashboardResponse>({
    queryKey: ["getUpcommingLiveSession"],
    queryFn: () =>
      getUpcommingLiveSession({ userId: userData?.query?.detailsid }),
  });

  return (
    <div className="">
      <div className="mb-5 flex justify-between items-center">
        <h3 className="font-bold font-nunito xl:text-[22px] text-lg relative pb-1">
          Upcoming live sessions
          <div className="bg-[#64A70B] w-[115px] h-[2px] absolute left-0 bottom-0"></div>
        </h3>
        {data && data?.sessions?.length > 2 && (
          <Button
            onClick={() =>
              navigate(`${location?.pathname?.split("/")[1]}/mycourses`)
            }
            className="bg-transparent text-base font-bold hover:bg-transparent text-[#00778B] font-nunito"
          >
            View all
          </Button>
        )}
      </div>
      <div className="sm:block hidden">
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data?.sessions!.map((data, index) => {
            return <LiveSessionsItems data={data} key={index} />;
          })}
        </div>
      </div>
      <div className="sm:hidden block">
        <CustomCarousel containerClassName="">
          {(data?.sessions || [])?.map((data, index) => {
            return <LiveSessionsItems data={data} key={index} />;
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default LiveSessions;
