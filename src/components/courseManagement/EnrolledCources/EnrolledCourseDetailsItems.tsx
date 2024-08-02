import { Badge } from "@/components/ui/badge";
import { CohortGroupType } from "@/types/enroll";

type detailsListProps = {
  data: CohortGroupType;
};

const EnrolledCourseDetailsItems = ({ data }: detailsListProps) => {
  const getDateBadgeStatus = () => {
    let statusName;
    const status = data?.employee?.every((employee) => {
      return employee?.progress === 100;
    });

    if (data?.employee?.length === 0) {
      statusName = "Upcoming";
    } else if (status) {
      statusName = "Completed";
    } else {
      statusName = "Ongoing";
    }
    return (
      <Badge
        className={`py-[6px] px-2.5 rounded-full text-xs text-black ${
          statusName === "Completed"
            ? "bg-[#51FFCB] hover:bg-[#51FFCB]"
            : statusName === "Ongoing"
            ? "bg-[#D6F5AC] hover:bg-[#D6F5AC]"
            : "bg-[#8AA06B] hover:bg-[#8AA06B]"
        }`}
      >
        {statusName}
      </Badge>
    );
  };

  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 w-full items-center">
      <div className="col-span-1 text-left font-semibold sm:text-base text-[15px] font-calibri">
        <h5>Cohort Group:</h5>
        <h6>{data?.name}</h6>
      </div>
      <div className="col-span-1 text-left font-semibold sm:text-base text-[15px] font-calibri">
        <h5>Enrolled Companies:</h5>
        <h6>{data.company?.length}</h6>
      </div>
      <div className="col-span-1 text-left font-semibold sm:text-base text-[15px] font-calibri">
        <h5>Enrolled Employees:</h5>
        <h6>{data.employee?.length}</h6>
      </div>
      <div className="col-span-1 sm:text-left text-right font-semibold sm:text-base text-[15px] font-nunito">
        {getDateBadgeStatus()}
      </div>
      <div className="sm:col-span-1 col-span-2 text-left font-semibold sm:text-base text-[15px] font-calibri">
        <span className="block">
          Start Date: {data?.slotStartDate?.date}-{data?.slotStartDate?.month}-
          {data?.slotStartDate?.year}
        </span>
        <span className="block">
          End Date: {data.slotEndDate?.date}-{data.slotEndDate?.month}-
          {data.slotEndDate?.year}
        </span>
      </div>
    </div>
  );
};

export default EnrolledCourseDetailsItems;
