import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import {
  CourseTime,
  IsOnline,
  RecommendedCourses,
} from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { fetchCourseDiscountEnroll } from "@/services/apiServices/enroll";
import { ErrorType } from "@/types/Errors";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import atu from "@/assets/images/atu.png";
import { sendMessage } from "@/services/apiServices/chatServices";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CourseListView({
  recommendeddata,
  totalData,
  currentIndex,
}: {
  recommendeddata: RecommendedCourses;
  totalData: number;
  currentIndex: number;
}) {
  const userData = useSelector((state: RootState) => state.user);
  const [isRecommendedCourse, setIsRecommendedCourseShow] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [recommendedCoursesById, setRecommendedCoursesById] = useState<number | null>()
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<number | null>()
  const pathName = location?.pathname?.split("/")[1];
  const { data: fetchCourseDiscountEnrollFun, isPending: isPendingCourseDEnroll } = useQuery({
    queryKey: [QUERY_KEYS.fetchCourseDiscountEnroll, { recommendedCoursesById }],
    queryFn: () => fetchCourseDiscountEnroll(recommendedCoursesById),
    enabled: !!recommendedCoursesById
  });

  // const getPillerName = (pillerData: CourseDataEntity[]) => {
  //   if (!pillerData) return null;
  //   return pillerData?.map((item) => {
  //     const pillarName = item?.fetchPillar?.pillarName;
  //     const pillerColor = item?.fetchMaturity?.rangeStart >= 1 && item?.fetchMaturity?.rangeEnd <= 40 ? "bg-[#F63636] text-white" :
  //       item?.fetchMaturity?.rangeStart >= 40.1 && item?.fetchMaturity?.rangeEnd <= 80 ? "bg-[#FFD56A] text-black" :
  //         "bg-[#64A70B] text-white";

  //     return <Badge
  //       variant="outline"
  //       className={`${pillerColor} border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
  //     >
  //       {pillarName}
  //     </Badge>
  //   })
  // }


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
      setRecommendedCoursesById(null);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  });

  const handleInquire = (data: RecommendedCourses[] | any) => {
    const payload = {
      senderId: userData?.UserId,
      receiverId: data?.trainerCompanyId ? data?.trainerCompanyId?.id : data?.trainerId?.id,
      message: data?.title,
      images: [data?.bannerImage]
    }
    handleSend(payload)
  }

  return (
    <>
      <Modal
        open={isRecommendedCourse}
        onClose={() => setIsRecommendedCourseShow(false)}
        className={`py-[60px] px-6 ${isPendingCourseDEnroll || fetchCourseDiscountEnrollFun?.data && fetchCourseDiscountEnrollFun?.data?.length > 0 ? "h-[200px]" : "max-w-[800px] max-h-[800px] h-[780px]"}`}
      >
        <RecommendedCoursesModel data={fetchCourseDiscountEnrollFun?.data || []} isLoading={isPendingCourseDEnroll} setOpen={setIsRecommendedCourseShow} />
      </Modal>

      <div>
        <div
          className={`bg-[#FFFFFF] pr-4 border border-[#D9D9D9] lg:p-5 p-4 rounded-md shadow-sm ${
            totalData && totalData - 1 === currentIndex ? "mb-0" : "mb-5"
          }`}
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="sm:col-span-10 col-span-12 flex sm:flex-row flex-col xl:gap-5 gap-3">
              <div className="overflow-hidden rounded sm:min-w-[152px] w-full sm:w-[152px] sm:min-h-[133px] sm:h-[133px]">
                <img
                  className="rounded object-cover object-center w-full h-full"
                  src={recommendeddata.bannerImage}
                  alt="Course"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-[#8C94A3] font-semibold text-sm">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap leading-[22px]">
                    {recommendeddata?.courseData?.map((item) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <p
                            className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full text-base font-normal font-calibri leading-[22px]`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-12 justify-between xl:gap-[50px] gap-4 items-center">
                  <div className="xl:col-span-10 col-span-12">
                    {" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: recommendeddata.description,
                      }}
                      className="font-inter lg:text-base text-sm line-clamp-2"
                    ></span>
                  </div>
                  <div className="xl:col-span-2 col-span-4">
                    <img
                      className="object-cover object-center"
                      src={atu}
                      alt="atu"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={speed} alt="speed" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px] text-black"
                      src={diploma}
                      alt="diploma"
                    />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={fulltime}
                      alt="fulltime"
                    />
                    <p className="text-xs">
                      {recommendeddata?.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {recommendeddata?.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={online}
                      alt="online"
                    />
                    <p className="text-xs">
                      {recommendeddata?.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={time} alt="time" />
                    <p className="text-xs">{recommendeddata?.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="unversity"
                    />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-12">
              <div className="flex sm:flex-col flex-row gap-2 sm:items-end items-center">
                <h3 className="text-[#000000] text-[font-calibri-bold] sm:w-[100px] w-[80px]">
                  €{recommendeddata.price}
                </h3>

                <Button
                  onClick={() => {setIsRecommendedCourseShow(true); setRecommendedCoursesById(recommendeddata?.id)}}
                  className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[100px]"
                >
                  Enroll Now
                </Button>
                <Button className=" h-[42px] bg-[#00778B] text-white font-semibold w-[100px] px-4 py-2 rounded"
                  onClick={() => {handleInquire(recommendeddata || []); setRecommendedCoursesById(recommendeddata?.id);}}
                  disabled={recommendedCoursesById === recommendeddata?.id}
                >
                  {recommendedCoursesById === recommendeddata?.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Inquire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseListView;
