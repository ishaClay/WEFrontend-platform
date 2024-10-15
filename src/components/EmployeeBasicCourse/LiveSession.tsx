import Zoom_Video from "@/assets/images/zoom-video.png";
import { QUERY_KEYS } from "@/lib/constants";
import {
  convertUTCToGMT,
  isSessionCompletedAtTime,
  isSessionOngoingAtTime,
} from "@/lib/utils";
import { updateEmployeeWiseCourseStatus } from "@/services/apiServices/courseSlider";
import { ModuleSectionsEntity } from "@/types/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

const LiveSession = ({
  list,
  data,
  setViewDocument,
}: {
  list: ModuleSectionsEntity;
  data: any;
  setViewDocument: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  function getTimeRemaining(startTime: string): any {
    // Parse the start time as a Date object
    const eventStartTime: Date = new Date(startTime);

    // Get the current time
    const now: Date = new Date();

    // Calculate the difference in milliseconds
    const timeDiff: number = eventStartTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return "The event has already started or has passed.";
    }

    // Calculate time components
    const minutes: number = Math.floor(timeDiff / 1000 / 60) % 60 || 0;
    const hours: number = Math.floor(timeDiff / 1000 / 60 / 60) % 24 || 0;
    const days: number = Math.floor(timeDiff / 1000 / 60 / 60 / 24) || 0;

    // Format the remaining time
    return { days, hours, minutes };
  }

  const timeRemaining = getTimeRemaining(list?.liveSection[0]?.startTime);

  const liveSessionData = list?.liveSection?.[0];

  const isBetweenTime = isSessionOngoingAtTime(
    liveSessionData?.startTime,
    liveSessionData?.sessionDuration
  );

  const isCompletedTime = isSessionCompletedAtTime(
    liveSessionData?.startTime,
    liveSessionData?.sessionDuration
  );

  console.log("🚀 ~ isCompletedTime:", isCompletedTime);
  const isEmployee = !!list?.liveSection[0]?.employee?.find(
    (item: any) => item.id === userData?.query?.detailsid
  );

  const isButtonPermission =
    +userData?.query?.role === 4 &&
    isEmployee &&
    !convertUTCToGMT(liveSessionData?.startTime).isAfter(new Date()) &&
    !isSessionOngoingAtTime(
      liveSessionData?.startTime,
      liveSessionData?.sessionDuration
    );

  const joinButtonPermission =
    +userData?.query?.role === 4 &&
    isEmployee &&
    isSessionOngoingAtTime(
      liveSessionData?.startTime,
      liveSessionData?.sessionDuration
    );
  console.log(
    "🚀 ~ joinButtonPermission:",
    joinButtonPermission,
    liveSessionData?.startTime
  );
  const { mutate, isPending } = useMutation({
    mutationFn: updateEmployeeWiseCourseStatus,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchEmployeeSingeCourse],
      });
      // setLike("");
      setViewDocument(false);
    },
    onError: (error: any) => {
      console.error("error", error);
    },
  });

  const handleStatusChanges = (status: number, id: number) => {
    const payload = {
      employeeid: userData?.query?.detailsid,
      status: status,
      trainerCompany:
        data?.course?.trainerCompanyId?.id || data?.course?.trainerId,
      user: userData.query.id,
      isTrainerCompany: data?.course?.trainerCompanyId?.id ? true : false,
    };
    mutate({ data: payload, courseId: id });
  };

  return (
    <div className="bg-white min-h-[calc(100vh_-_130px)]">
      <div className="md:p-5 p-4">
        <div className="border-b border-t border-[#D9D9D9] md:py-5 py-4 mb-5">
          <div className="flex items-center md:gap-5 gap-4">
            <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] rounded-full">
              <img src={Zoom_Video} alt="" className="w-full h-full" />
            </div>
            <div className="md:flex block items-center justify-between w-full">
              <div className="">
                <h5 className="md:text-base text-sm text-black font-bold font-droid pb-1.5">
                  Live Session({list?.title})
                </h5>
                <div className="sm:flex block items-center gap-5 md:mb-0 mb-2">
                  <h6 className="flex items-center gap-2 text-xs text-[#777] sm:mb-0 mb-2">
                    <CalendarDays width={20} className="text-[#666666]" /> Date
                    :
                    <span className="text-black">
                      {convertUTCToGMT(list?.liveSection[0]?.startTime).format(
                        "DD MMM, YYYY"
                      )}{" "}
                    </span>
                  </h6>
                  {list?.liveSection?.length > 0 && (
                    <h6 className="flex items-center gap-2 text-xs text-[#777]">
                      <Clock width={20} className="text-[#666666]" /> Time :{" "}
                      <span className="text-black">
                        {convertUTCToGMT(
                          list?.liveSection[0]?.startTime
                        ).format("hh:mm A")}{" "}
                        to{" "}
                        {convertUTCToGMT(list?.liveSection[0]?.startTime)
                          .add(list?.liveSection[0]?.sessionDuration, "m")
                          .format("hh:mm A")}
                      </span>
                    </h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#00778B1A] xl:h-[450px] sm:h-[425px] h-[380px] w-full rounded-xl flex justify-center items-center">
          <div className="text-center">
            {liveSessionData?.startTime ? (
              isCompletedTime ? (
                <p className="text-[#313131] sm:text-sm text-xs font-droid mb-5">
                  The meeting has been completed.
                </p>
              ) : isBetweenTime ? (
                <p className="text-[#313131] sm:text-sm text-xs font-droid mb-5">
                  The meeting has started.
                </p>
              ) : (
                <p className="text-[#313131] sm:text-sm text-xs font-droid mb-5">
                  The meeting link will be enabled in{" "}
                  {`${
                    timeRemaining?.days?.toString()?.padStart(2, "0") ?? 0
                  } days, ${
                    timeRemaining?.hours?.toString()?.padStart(2, "0") ?? 0
                  } hours, ${
                    timeRemaining?.minutes?.toString()?.padStart(2, "0") ?? 0
                  } minutes`}{" "}
                  .
                </p>
              )
            ) : (
              <p className="text-[#313131] sm:text-sm text-xs font-droid mb-5">
                The meeting has not been scheduled.
              </p>
            )}
            <a
              target="_blank"
              href={list?.liveSection[0]?.zoomApiBaseUrl}
              className={`bg-[#00778B] text-sm font-droid px-10 py-3 text-white rounded-[6px] sm:h-[42px] h-[36px] ${
                !joinButtonPermission
                  ? "!pointer-events-none opacity-50"
                  : "!pointer-events-auto opacity-100"
              }`}
            >
              Join
            </a>
          </div>
        </div>
      </div>

      {+userData?.query?.role === 4 && (
        <div className="text-center">
          <Button
            type="button"
            isLoading={isPending}
            disabled={!isButtonPermission}
            onClick={() => handleStatusChanges(2, list?.id)}
            className="bg-[#00778B] xl:h-12 sm:h-9 h-8 px-5 font-droid xl:text-base text-sm"
          >
            Mark As Completed
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveSession;
