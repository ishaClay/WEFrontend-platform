import ModuleVideoPlay from "@/assets/images/assesment_test.png";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { UserRole } from "@/types/UserRole";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import ModuleCourseViewCardItems from "./ModuleCourseViewCardItems";

const ModuleCourseViewCard = ({ data, allData, enrollData }: any) => {
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { versionId } = useParams();
  const [searchParams] = useSearchParams();
  const assessmentData = data?.assessment?.[0];
  const courseId = searchParams.get("courseId");
  const userData = JSON.parse(localStorage.getItem("user") as string);

  return (
    <div>
      {(data?.moduleSection || data?.moduleSections)
        ?.sort((a: any, b: any) => a.position - b.position)
        ?.map((data1: any, index: number) => {
          return (
            <ModuleCourseViewCardItems
              key={index}
              list={data1}
              data={allData}
              enrollData={enrollData}
            />
          );
        })}
      {data?.assessment?.length > 0 && (
        <div className="flex items-center ml-6 mt-5">
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
                className={cn(
                  "sm:text-base text-sm text-black font-droid cursor-pointer inline-block",
                  {
                    "pointer-events-none":
                      +userData?.query?.role === 4
                        ? (data?.moduleSection || data?.moduleSections)?.some(
                            (item: any) => item?.isStatus !== "Completed"
                          )
                        : +userData?.query?.role === 1,
                  }
                )}
                onClick={() => {
                  if (+userData?.query?.role !== 1) {
                    navigate(
                      `/${UserRole[
                        +userData?.query?.role
                      ]?.toLowerCase()}/employee-assessment/${
                        assessmentData?.id
                      }?moduleId=${data?.id}`,
                      {
                        state: {
                          versionId: versionId,
                          courseId: courseId,
                          isCompleted: data?.assessment?.[0]?.isCompleted,
                        },
                      }
                    );
                  }
                }}
              >
                {assessmentData?.title}
              </h5>
              {/* <div className="sm:flex block items-center">
                <h6 className="text-[#747474] text-xs font-droid">
                  Assessment
                </h6>
                <h6 className="text-[#747474] text-xs font-droid">
                  Duration :{" "}
                  {assessmentData?.timeDuration?.hours
                    ?.toString()
                    ?.padStart(2, "0") || "00"}
                  :{" "}
                  {assessmentData?.timeDuration?.minutes
                    ?.toString()
                    ?.padStart(2, "0") || "00"}
                  :{" "}
                  {assessmentData?.timeDuration?.seconds
                    ?.toString()
                    ?.padStart(2, "0") || "00"}
                </h6>
              </div> */}
            </div>
            {+role === 4 && (
              <Button
                type="button"
                disabled={(data?.moduleSection || data?.moduleSections)?.some(
                  (item: any) => !item.isLive && item?.isStatus !== "Completed"
                )}
                onClick={() =>
                  navigate(
                    `/employee/employee-assessment/${assessmentData?.id}?moduleId=${data?.id}`,
                    {
                      state: {
                        versionId: versionId,
                        courseId: courseId,
                        isCompleted: data?.assessment?.[0]?.isCompleted,
                      },
                    }
                  )
                }
                // isLoading={isPending}
                className="bg-[#00778B] xl:h-12 h-9 px-5 font-droid xl:w-[110px] w-[80px] xl:text-base text-sm"
                // disabled={assessmentData?.isCompleted}
              >
                {data?.assessment?.[0]?.isCompleted ? "View" : "Start"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCourseViewCard;
