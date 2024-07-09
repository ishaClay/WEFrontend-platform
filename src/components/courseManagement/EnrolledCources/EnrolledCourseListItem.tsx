import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { Data } from "@/types/enroll";

const EnrolledCourseListItem = ({ data }: Data | any) => {  
  return (
    <div className="">
      <div className="flex">
        <div className="">
          <img
            src={data?.courseVersion?.course?.bannerImage}
            alt=""
            className="w-[152px] xl:h-[152px] h-[100px] rounded-md overflow-hidden"
          ></img>
        </div>
        <div className="text-left ps-6">
          <div className="flex items-cent+er xl:pb-5 pb-3">
            <CourseList rating={data.rating} />
            <div className="flex gap-3 ml-3">
            {data?.courseVersion?.course?.courseData?.map((item:any) => {
                const pillarName = item.fetchPillar?.pillarName;
                return (
                  <Badge
                    variant="outline"
                    className={`bg-[${pillarName === "Environmental" || pillarName === "Governance"
                      ? "#FFD56A"
                      : pillarName === "Technology & Innovation" || pillarName === "Strategic Integration" || pillarName === "Economics"
                      ? "#F63636"
                      : "#64A70B"}] border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
                  >
                    {pillarName}
                  </Badge>
                );
              })}
              </div>
          </div>
          <h5 className="text-[#1D2026] font-bold mb-3 text-base">
            {data?.courseVersion?.course.title}
          </h5>
          <h6 className="pb-2 flex font-calibri text-base text-[#1D2026]">
            <span>Trainer :</span>
            {data?.courseVersion?.course.trainerCompanyId?.providerName}
          </h6>
          <div className="flex items-center">
            <div className="pe-5 flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Companies :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                {data.company?.name}
              </span>
            </div>
            <div className="flex">
              <span className="text-base text-[#1D2026] font-calibri">
                Enrolled Employees :
              </span>
              <span className="text-base text-[#1D2026] font-calibri font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;
