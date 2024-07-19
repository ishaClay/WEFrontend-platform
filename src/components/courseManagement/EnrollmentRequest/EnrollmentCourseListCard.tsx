import AcceptedIcon from "@/assets/images/Accepted_icons.png";
import RejectedIcons from "@/assets/images/Rejected_icons.png";
import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { sendMessage } from "@/services/apiServices/chatServices";
import { UpdateEnrollmentRequest } from "@/services/apiServices/courseManagement";
import { ErrorType } from "@/types/Errors";
import { Data, Enroll } from "@/types/enroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Euro, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EnrollmentCourseListCard = ({
  data,
}: {
  data: Data;
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { UserId } = useSelector((state: RootState) => state.user);
  const pathName: string = location?.pathname?.split("/")[1];
  const [selectEnrollType, setSelectEnrollType] = useState<number | null>();
  const { mutate: updateEnrollRequest } = useMutation({
    mutationFn: (data: any) => UpdateEnrollmentRequest(data?.id, data?.enroll),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchEnrollmentRequestBytrainer],
      });
      setSelectEnrollType(null);
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

  const { mutate: handleSend } = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
      navigate(`/${pathName}/message`)
      // socket.emit("new message", data?.data);
      console.log("data+++++", data);
      
    },
    onError:(error: ErrorType) => {
      console.log("data+++++error", error);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  });

  const handleInquire = (data: Data | any) => {
    const trainerCompany = data?.courseVersion?.course;
    const payload = {
      senderId: UserId,
      receiverId: trainerCompany?.trainerCompanyId ? data?.trainerCompanyId?.userDetails?.id : data?.trainerId?.userDetails?.id,
      message: data?.title,
      images: [data?.bannerImage]
    }
    handleSend(payload)
  }

  return (
    <div className="xl:flex block items-center justify-between border border-[#D9D9D9] 2xl:p-5 sm:p-3 p-0 rounded-md sm:mb-4 sm:mx-4 m-[15px] gap-4">
      <div className="sm:flex block items-center">
        <div className="sm:min-w-[152px] sm:min-h-[152px] sm:w-[152px] sm:h-[152px]">
          <img
            src={data?.courseVersion?.course?.bannerImage}
            alt="img"
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="sm:pl-[23px] px-3 pt-3">
          <div className="flex xl:flex-nowrap flex-wrap items-center xl:pb-5 pb-3 gap-3">
            <CourseList rating={0} />
            <div className="flex xl:flex-nowrap flex-wrap gap-2">
              {data?.courseVersion?.course?.courseData?.map((item) => {
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

          <h6 className="text-base sm:leading-7 leading-5 text-[#1D2026] font-inter font-medium">
            {data?.courseVersion?.course?.title}
          </h6>
          <div className="flex flex-wrap justify-between items-center xl:pt-5 sm:pt-2 pt-3 2xl:gap-6 xl:gap-4 sm:gap-2 gap-[10px]">
            <div className="font-calibri">
              <p className="sm:text-base text-sm font-medium">
                Company Name :{" "}
                <span className="font-bold">{data?.company?.name}</span>
              </p>
            </div>
            <div className="font-calibri">
              <p className="sm:text-base text-sm font-medium">
                Number Of Employee :{" "}
                <span className="font-bold">{data?.employee?.length || 0}</span>
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
        <div className="flex xl:justify-center sm:justify-end justify-start sm:p-0 p-3 xl:flex-nowrap flex-wrap gap-2 lg:mt-0 md:mt-2 sm:mt-4 mt-0">
          {data?.enroll === Enroll.enquiry ? (
            <Button
              className="bg-[#00778B] sm:w-[125px] sm:h-[42px] w-[87px] h-[31px]"
              onClick={() => handleInquire(data)}
            >
              Show Message
            </Button>
          ) : (
            <Button
              className="bg-[#00778B] sm:w-[102px] sm:h-[42px] w-[87px] h-[31px]"
              onClick={() => handleInquire(data)}
            >
              Enquire
            </Button>
          )}
          <Button
            onClick={() => {EditCourse(Enroll.accept); setSelectEnrollType(Enroll.accept)}}
            className="bg-[#58BA66] sm:w-[102px] sm:h-[42px] w-[87px] h-[31px] sm:text-base text-sm"
            disabled={selectEnrollType === Enroll.accept}
          >
            {selectEnrollType === Enroll.accept && <Loader2 className="w-5 h-5 animate-spin" />} Accept
          </Button>
          <Button
            onClick={() => {EditCourse(Enroll.reject); setSelectEnrollType(Enroll.reject)}}
            className="bg-[#FF5252] sm:w-[102px] sm:h-[42px] w-[87px] h-[31px] sm:text-base text-sm"
            disabled={selectEnrollType === Enroll.reject}
          >
            {selectEnrollType === Enroll.reject && <Loader2 className="w-5 h-5 animate-spin" />} Reject
          </Button>
        </div>
      )}
      {data?.enroll === Enroll.accept && (
        <div className="flex items-center pr-8 xl:justify-center sm:justify-end justify-center xl:p-0 sm:p-0 p-[15px]">
          <img src={AcceptedIcon} alt="" width={18} />
          <span className="text-[#58BA66] font-calibri text-base pl-1">
            Accepted
          </span>
        </div>
      )}
      {data?.enroll === Enroll.reject && (
        <div className="flex items-center pr-8 xl:justify-center sm:justify-end justify-center sm:p-0 sm:pt-3 p-[15px]">
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
