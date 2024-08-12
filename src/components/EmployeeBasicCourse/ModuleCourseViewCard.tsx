import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ModuleCourseViewCardItems from "./ModuleCourseViewCardItems";
import ModuleVideoPlay from "@/assets/images/video-play.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ModuleCourseViewCard = ({ data }: any) => {
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const assessmentData = data?.assessment?.[0];

  return (
    <div>
      {(data?.moduleSection || data?.moduleSections)
        ?.sort((a: any, b: any) => a.position - b.position)
        ?.map((data: any, index: number) => {
          return <ModuleCourseViewCardItems key={index} list={data} />;
        })}
      {
        data?.assessment?.length > 0 && <div className="flex items-center ml-6 mt-5">
          <div className="me-3">
            <img
              src={ModuleVideoPlay}
              alt="assessment"
              className="max-w-[32px] w-auto h-auto"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <h5
                className={`sm:text-base text-sm text-black font-nunito pb-2 cursor-pointer inline-block`}
              >
                {assessmentData?.title}
              </h5>
              <div className="sm:flex block items-center">
                <h6 className="text-[#747474] text-xs font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
                  Assessment
                </h6>
                <h6 className="text-[#747474] text-xs font-nunito">
                  Duration : {assessmentData?.timeDuration?.hours?.toString()?.padStart(2, "0")}
                  : {assessmentData?.timeDuration?.minutes?.toString()?.padStart(2, "0")}:{" "}
                  {assessmentData?.timeDuration?.seconds?.toString()?.padStart(2, "0")}
                </h6>
              </div>
            </div>
            {+role === 4 && (
            <Button
              type="button"
              onClick={() => navigate(`/employee/employee-assessment/${assessmentData?.id}?moduleId=${data?.id}`)}
              // isLoading={isPending}
              className="bg-[#00778B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
              disabled={assessmentData?.isCompleted}
            >
              Start
            </Button>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default ModuleCourseViewCard;
