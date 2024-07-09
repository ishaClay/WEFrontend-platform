import AcceptedIcon from "@/assets/images/Accepted_icons.png";
import RejectedIcons from "@/assets/images/Rejected_icons.png";
import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { UpdateEnrollmentRequest } from "@/services/apiServices/courseManagement";
import { ErrorType } from "@/types/Errors";
import { Enroll, FetchEnrollRequestDataType } from "@/types/enroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Euro } from "lucide-react";


const EnrollmentCourseListCard = ({ data }: {data: FetchEnrollRequestDataType}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateEnrollRequest } = useMutation({
    mutationFn: (data: any) => UpdateEnrollmentRequest(data?.id, data?.enroll),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchEnrollmentRequestBytrainer],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });
  const EditCourse = (type: number) => {
    updateEnrollRequest({
      id: data.id,
      enroll: {
        enroll: type,
      },
    });
  };

  return (
    <div className="flex items-center justify-between border border-[#D9D9D9] 2xl:p-5 p-3 rounded-md mb-4 mx-4">
      <div className="flex items-center">
        <div>
          <img
            src={data?.courseVersion?.course?.bannerImage}
            alt="img"
            className="w-[152px] xl:h-[152px] h-[100px] rounded-md"
          />
        </div>
        <div className="2xl:px-10 xl:px-8 px-4">
          <div className="flex items-center xl:pb-5 pb-3">
            <CourseList rating={0} />
            <div className="ml-3 flex gap-2">
              {data?.courseVersion?.course?.courseData?.map((item) => {
                return (
                  <Badge
                    variant="outline"
                    className={`bg-[#EDF0F4] border-[#EDF0F4] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                  >
                    {item.fetchPillar?.pillarName}
                  </Badge>
                );
              })}
              {data?.courseVersion?.course?.courseData?.map((item) => {
                return (
                  <Badge
                    variant="outline"
                    className={`bg-[${item.fetchMaturity?.color}] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                  >
                    {item?.fetchMaturity?.maturityLevelName}
                  </Badge>
                );
              })}
            </div>
          </div>

          <h6 className="xl:text-base text-sm leading-7 text-[#1D2026] font-inter font-medium">
            {data?.courseVersion?.course?.title}
          </h6>
          <div className="flex flex-wrap justify-between items-center xl:pt-5 pt-2 gap-6">
            <div className="font-calibri">
              <p className="text-base font-medium">
                Company Name :{" "}
                <span className="font-bold">{data?.company?.name}</span>
              </p>
            </div>
            <div className="font-calibri">
              <p className="text-base font-medium">
                Number Of Employee :{" "}
                <span className="font-bold">
                  {data?.employee?.length || 0}
                </span>
              </p>
            </div>
            <div className="flex font-bold font-calibri text-base">
              <Euro className="w-[16px] font-bold" />
              {data?.courseVersion?.course?.price}
            </div>
          </div>
        </div>
      </div>
      {(data?.enroll === Enroll.default || data?.enroll === Enroll.enquiry) && (
        <div className="flex justify-center xl:flex-nowrap flex-wrap">
          {data?.enroll === Enroll.enquiry ? (
            <Button className="bg-[#00778B] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1">
              Show Message
            </Button>
          ) : (
            <Button className="bg-[#00778B] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1">
              Enquire
            </Button>
          )}
          <Button
            onClick={() => EditCourse(Enroll.accept)}
            className="bg-[#58BA66] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1"
          >
            Accept
          </Button>
          <Button
            onClick={() => EditCourse(Enroll.reject)}
            className="bg-[#FF5252] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1"
          >
            Reject
          </Button>
        </div>
      )}
      {data?.enroll === Enroll.accept && (
        <div className="flex items-center pr-8">
          <img src={AcceptedIcon} alt="" width={18} />
          <span className="text-[#58BA66] font-calibri text-base pl-1">
            Accepted
          </span>
        </div>
      )}
      {data?.enroll === Enroll.reject && (
        <div className="flex items-center pr-8">
          <img src={RejectedIcons} alt="" width={18} />
          <span className="text-[#FF5252] font-calibri text-base pl-1">
            Rejected
          </span>
        </div>
      )}
    </div>
  );
};

export default EnrollmentCourseListCard;
