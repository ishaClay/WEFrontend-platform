import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { Data } from "@/types/enroll";

const EnrolledCourseListItem = ({ data }: Data | any) => {
  return (
    <div className="flex sm:flex-row flex-col items-center sm:gap-6 gap-4">
      <div className="sm:min-w-[140px] sm:w-[140px] sm:min-h-[148px] sm:h-[148px] w-full rounded-md overflow-hidden">
        <img
          src={data?.courseVersion?.course?.bannerImage}
          alt=""
          className="w-full h-full"
        ></img>
      </div>
      <div className="w-full flex flex-col items-start xl:gap-2.5 gap-2 sm:px-0 px-4 pb-4">
        <div className="flex items-center flex-wrap xl:gap-3 gap-2">
          <CourseList rating={data.rating} />
          <div className="flex items-center flex-wrap xl:gap-3 gap-2">
            {data?.courseVersion?.course?.courseData?.map((item: any) => {
              const pillarName = item.fetchPillar?.pillarName;
              return (
                <Badge
                  variant="outline"
                  className={`bg-[${
                    pillarName === "Environmental" ||
                    pillarName === "Governance"
                      ? "#FFD56A"
                      : pillarName === "Technology & Innovation" ||
                        pillarName === "Strategic Integration" ||
                        pillarName === "Economics"
                      ? "#F63636"
                      : "#64A70B"
                  }] border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
                >
                  {pillarName}
                </Badge>
              );
            })}
          </div>
        </div>
        <h5 className="text-[#1D2026] text-left font-bold text-base">
          {data?.courseVersion?.course.title}
        </h5>
        <h6 className="flex font-calibri md:text-base text-sm text-[#1D2026]">
          <span>Trainer :</span>
          {data?.courseVersion?.course.trainerCompanyId?.providerName}
        </h6>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1">
            <span className="md:text-base text-sm text-[#1D2026] font-calibri">
              Enrolled Companies :
            </span>
            <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
              {data.company?.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="md:text-base text-sm text-[#1D2026] font-calibri">
              Enrolled Employees :
            </span>
            <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;
