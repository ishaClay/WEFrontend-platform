import { Badge } from "@/components/ui/badge";
import { CohortGroupType, SlotStartDateOrSlotEndDate } from "@/types/enroll";
import moment from "moment";

type detailsListProps = {
  data: CohortGroupType;
};

const EnrolledCourseDetailsItems = ({ data }: detailsListProps) => {
  const getDateBadgeStatus = (startDate:SlotStartDateOrSlotEndDate, endDate:SlotStartDateOrSlotEndDate) => {
    const newStartDate = `${startDate?.date}/${startDate?.month}/${startDate?.year}`
    const newEndDate = `${endDate?.date}/${endDate?.month}/${endDate?.year}`
    const currentDate = moment(new Date()).format("DD/MM/YYYY");
    let statusName;

    if (newEndDate < currentDate) {
      statusName = "Completed";
    } else if (newStartDate <= currentDate && newEndDate >= currentDate) {
      statusName = "Ongoing";
    } else {
      statusName = "Upcoming";
    }
    return <Badge className={`py-2 px-4 rounded-full text-xs text-black ${statusName === "Completed" ? "bg-[#51FFCB] hover:bg-[#51FFCB]" : statusName === "Ongoing" ? "bg-[#D6F5AC] hover:bg-[#D6F5AC]" : "bg-[#8AA06B] hover:bg-[#8AA06B]"}`}>{statusName}</Badge>
  }
  
  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 w-full">
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Cohort Group:</h5>
        <h6>{data?.name}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Enrolled Companies:</h5>
        <h6>{data.company?.length}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <h5>Enrolled Companies:</h5>
        <h6>{data.employee?.length}</h6>
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        {
          getDateBadgeStatus(data?.slotStartDate, data.slotEndDate)
        }
      </div>
      <div className="col-span-1 text-left font-bold text-base font-calibri">
        <span className="block">Start Date: {data?.slotStartDate?.date}-{data?.slotStartDate?.month}-{data?.slotStartDate?.year}</span>
        <span className="block">End Date: {data.slotEndDate?.date}-{data.slotEndDate?.month}-{data.slotEndDate?.year}</span>
      </div>
    </div>
  );
};

export default EnrolledCourseDetailsItems;
