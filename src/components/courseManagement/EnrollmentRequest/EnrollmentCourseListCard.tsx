import AcceptedIcon from "@/assets/images/Accepted_icons.png";
import RejectedIcons from "@/assets/images/Rejected_icons.png";
import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { UpdateEnrollmentRequest } from "@/services/apiServices/courseManagement";
import { ErrorType } from "@/types/Errors";
import { Enroll } from "@/types/enroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Euro } from "lucide-react";

interface CourseDetailType {
  maturityId: number;
  pillarId: number;
  fetchMaturity: {
    color: string;
    createdAt: string;
    deletedAt: Date;
    id: number;
    maturityLevelName: string;
    rangeEnd: number;
    rangeStart: number;
    updatedAt: Date;
  };
  fetchPillar: {
    id: string;
    pillarName: string;
    checked: number;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface EnrollmentCourseListCardProps {
  data: {
    course: {
      bannerImage: string;
      averageNumberOfEmployees: string;
      companyName: string;
      courseData: CourseDetailType[];
      createdAt: string;
      deletedAt: any;
      description: string;
      discountApplicable: number;
      discout: number;
      duration: string;
      ectsCredits: string;
      fetCredits: string;
      freeCourse: number;
      id: number;
      institute: string;
      instituteOther: string;
      instituteWebsite: string;
      instituteWebsite2: string;
      isOnline: number;
      keys: {
        key: string;
      }[];
      otherInstitutionName: string;
      price: number;
      provider: number;
      status: string;
      time: number;
      title: string;
    };
    createdAt: string;
    enroll: number;
    id: number;
    request: number;
  };
}

const EnrollmentCourseListCard = ({ data }: EnrollmentCourseListCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: updateEnrollRequest } = useMutation({
    mutationFn: (data: any) => UpdateEnrollmentRequest(data.id, data.enroll),
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
            src={data.course.bannerImage}
            alt="img"
            className="w-[152px] xl:h-[152px] h-[100px] rounded-md"
          />
        </div>
        <div className="2xl:px-10 xl:px-8 px-4">
          <div className="flex items-center xl:pb-5 pb-3">
            <CourseList rating={0} />
            {data?.course?.courseData?.map((item) => {
              return (
                <Badge
                  variant="outline"
                  className={`bg-[${item.fetchMaturity?.color}] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                >
                  {item.fetchPillar?.pillarName}
                </Badge>
              );
            })}
          </div>

          <h6 className="xl:text-base text-sm leading-7 text-[#1D2026] font-inter font-medium">
            {data.course.title}
          </h6>
          <div className="flex flex-wrap justify-between items-center xl:pt-5 pt-2 gap-6">
            <div className="font-calibri">
              <p className="text-base font-medium">
                Company Name :{" "}
                <span className="font-bold">{data.course.companyName}</span>
              </p>
            </div>
            <div className="font-calibri">
              <p className="text-base font-medium">
                Number Of Employee :{" "}
                <span className="font-bold">
                  {data.course.averageNumberOfEmployees}
                </span>
              </p>
            </div>
            <div className="flex font-bold font-calibri text-base">
              <Euro className="w-[16px] font-bold" />
              {data.course.price}
            </div>
          </div>
        </div>
      </div>
      {(data.enroll === Enroll.default || data.enroll === Enroll.enquiry) && (
        <div className="flex justify-center xl:flex-nowrap flex-wrap">
          {data.enroll === Enroll.enquiry ? (
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
      {data.enroll === Enroll.accept && (
        <div className="flex items-center pr-8">
          <img src={AcceptedIcon} alt="" width={18} />
          <span className="text-[#58BA66] font-calibri text-base pl-1">
            Accepted
          </span>
        </div>
      )}
      {data.enroll === Enroll.reject && (
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
