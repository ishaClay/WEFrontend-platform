import { getTotalDuration } from "@/lib/utils";

type moduleCourseCardProps = {
  data: {
    moduleName: string;
    sectionId: number;
    duration: string;
  };
};

const ModuleCardList = ({ data }: moduleCourseCardProps | any) => {
  const getTotalSectionsTime = (
    data?.moduleSections || data?.moduleSection
  )?.map((it: any) => it?.readingTime);
  const totalTimeInSeconds = getTotalDuration(getTotalSectionsTime);

  console.log("totalTimeInSeconds", data?.moduleSection);

  // Convert total seconds back to hours, minutes, seconds
  const hours = Math.floor(totalTimeInSeconds / 3600)
    ?.toString()
    ?.padStart(2, "0");
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60)
    ?.toString()
    ?.padStart(2, "0");
  const seconds = (totalTimeInSeconds % 60)?.toString()?.padStart(2, "0");

  return data ? (
    <div className="">
      <h3 className="sm:text-base text-sm font-bold font-calibri pb-2 text-left flex items-center">
        {/* <CircleAlert className="me-2 text-[#747474]" /> */}
        {data?.title}
      </h3>
      <div className="flex items-center">
        <h6 className="text-xs text-[#747474] font-inter pe-3 me-3 border-e border-[#747474]">
          Section: {data.moduleSections?.length}
        </h6>
        <h6 className="text-xs text-[#747474] font-inter">
          Duration {hours}: {minutes}: {seconds}
        </h6>
      </div>
    </div>
  ) : (
    <div className="text-center w-full py-10">No data found</div>
  );
};

export default ModuleCardList;
