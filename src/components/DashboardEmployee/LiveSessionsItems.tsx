import Course_image from "@/assets/images/Course_image.png";
import { useMemo } from "react";
import { convertUTCToGMT } from "@/lib/utils";
import { SessionsEntity } from "@/types/dashboard";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

type liveSessionItemsProps = {
  data: SessionsEntity;
};

const LiveSessionsItems = ({ data }: liveSessionItemsProps) => {
  const isEnableJoinButton = useMemo(() => {
    const date = convertUTCToGMT(data.date);
    const startTime = convertUTCToGMT(data.startTime);
    const endTime = convertUTCToGMT(data.startTime).add(
      data.sessionDuration,
      "minutes"
    );
    const currentDate = convertUTCToGMT(new Date());

    const isCheckData = date.isSame(currentDate);

    if (isCheckData) {
      if (startTime.isSame(currentDate)) {
        return true;
      } else if (startTime.isAfter(currentDate)) {
        return true;
      } else if (endTime.isBefore(currentDate)) {
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }, [data]);

  return (
    <div className="col-span-1 md:p-5 p-4 shadow rounded-md sm:m-0 m-1">
      <div className="flex">
        <div className="">
          <div className="rounded-md overflow-hidden min-w-20 min-h-20 w-20 h-20">
            <img
              src={data.course?.bannerImage || Course_image}
              alt="img"
              className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
            />
          </div>
          <a
            href={data?.zoomApiBaseUrl}
            target="_blank"
            className={`${
              isEnableJoinButton
                ? "cursor-pointer pointer-events-auto"
                : "cursor-default pointer-events-none opacity-60"
            } flex justify-center mt-2 items-center bg-transparent text-sm hover:bg-transparent text-[#00778B] font-bold p-0`}
          >
            JOIN <ArrowRight width={16} />
          </a>
        </div>
        <div className="md:ps-5 ps-3">
          <h5 className="md:text-base text-sm font-medium font-droid text-[#1D2026] mb-2 line-clamp-1">
            {data.subtitle}
          </h5>
          <h6 className="text-[#1D2026] md:text-sm text-xs font-normal font-droid mb-2 line-clamp-2 min-h-[40px]">
            {data.description}
          </h6>
          <h6 className="flex items-center text-xs text-[#666666] pb-1">
            <CalendarDays width={14} />
            Date:{" "}
            <span className="text-black">
              {convertUTCToGMT(data.date).format("Do MMMM, YYYY")}
            </span>
          </h6>
          <h6 className="flex items-center text-xs text-[#666666]">
            <Clock width={14} />
            Time:{" "}
            <span className="text-black">
              {convertUTCToGMT(data.startTime).format("hh:mm A")} to{" "}
              {convertUTCToGMT(data.startTime)
                .add(data.sessionDuration, "minutes")
                .format("hh:mm A")}{" "}
              (GMT Time)
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionsItems;
