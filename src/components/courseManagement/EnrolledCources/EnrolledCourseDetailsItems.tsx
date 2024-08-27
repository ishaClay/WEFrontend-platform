import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createCohortGroupUser } from "@/services/apiServices/cohort";
import { CohortGroupType } from "@/types/enroll";
import { useMutation } from "@tanstack/react-query";

type detailsListProps = {
  data: CohortGroupType;
};

const EnrolledCourseDetailsItems = ({ data }: detailsListProps) => {
  console.log("data", data);
  
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

  const { mutate, isPending } = useMutation({
    mutationFn: createCohortGroupUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateGroup = (id: number) => {
    if (data?.groupChat === null) {
      mutate({
        cohortId: id,
      });
    } else {
      toast({
        title: "Error",
        description: "group already created",
        variant: "destructive",
      });
    }
  };

  console.log("data", data);

  return (
    <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2 w-full items-center">
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
      <div className="col-span-1">
        <Button
          type="button"
          isLoading={isPending}
          onClick={(e) => {
            e.preventDefault();
            handleCreateGroup(data?.id);
          }}
        >
          Ask a Question
        </Button>
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
