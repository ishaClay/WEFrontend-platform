import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { EnrolledCoursesType } from "@/types/enroll";

const EnrolledCourseListItem = ({ data }: EnrolledCoursesType | any) => {
  return (
    <div className="flex sm:flex-row flex-col items-center sm:gap-6 gap-2.5 sm:border-0 border rounded-[6px]">
      <div className="sm:min-w-[140px] sm:w-[140px] sm:min-h-[148px] sm:h-[148px] w-full rounded-md overflow-hidden">
        <img
          src={data?.course?.bannerImage}
          alt="bannerImage"
          className="w-full h-full"
        />
      </div>
      <div className="w-full items-start sm:px-0 px-[15px] pb-[15px]">
        <div className="flex items-center flex-wrap xl:gap-4 gap-2 pb-2.5">
          <CourseList rating={data.rating} />
          <div className="flex items-center flex-wrap gap-[7px]">
            {data?.course?.courseData?.map((item: any) => {
              const pillarName = item.fetchPillar?.pillarName;
              const bg = item.fetchMaturity?.color;
              return (
                <Badge
                  variant="outline"
                  className={`bg-[${bg}] border-[#EDF0F4] py-[5px] px-[10px] text-[#3A3A3A] text-xs font-Poppins font-normal`}
                >
                  {pillarName}
                </Badge>
              );
            })}
          </div>
        </div>
        <h5 className="text-[#1D2026] text-left font-bold text-base sm:pb-4 pb-3">
          {data?.course.title}
        </h5>
        <h6 className="flex font-calibri md:text-base text-sm text-[#1D2026] pb-2">
          <span>Trainer :</span>
          {data?.course.trainerCompanyId?.providerName ||
            data?.course?.trainerId?.providerName}
        </h6>
        <div className="flex sm:flex-row flex-col flex-wrap sm:items-center items-start sm:gap-[19px] gap-2">
          <div className="flex flex-wrap gap-1">
            <span className="md:text-base text-sm text-[#1D2026] font-calibri">
              Enrolled Companies :
            </span>
            <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
              {data?.numberOfCompany || 0}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="md:text-base text-sm text-[#1D2026] font-calibri">
              Enrolled Employees :
            </span>
            <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
              {data?.numberOfEmployee || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;
