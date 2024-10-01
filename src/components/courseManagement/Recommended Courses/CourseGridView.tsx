/* eslint-disable @typescript-eslint/ban-ts-comment */
import atu from "@/assets/images/atu.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import speed from "@/assets/images/Speed.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import Modal from "@/components/comman/Modal";
import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { sendMessage } from "@/services/apiServices/chatServices";
import { createInquiry } from "@/services/apiServices/courseManagement";
import { fetchCourseDiscountEnroll } from "@/services/apiServices/enroll";
import { CourseTime, IsOnline } from "@/types/allcourses";
import { ErrorType } from "@/types/Errors";
import { RecommendedCourses } from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let socket: any;

const CourseGridView = ({
  recommendeddata,
}: {
  recommendeddata: RecommendedCourses;
}) => {
  const { UserId } = useAppSelector((state: any) => state?.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const Role = location?.pathname?.split("/")[1];
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<
    number | null
  >();
  const [isRecommendedCourseShow, setIsRecommendedCourseShow] = useState(false);
  const pathName = location?.pathname?.split("/")[1];

  const {
    data: fetchCourseDiscountEnrollFun,
    isPending: isPendingCourseDEnroll,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchCourseDiscountEnroll,
      { recommendedCoursesById },
    ],
    queryFn: () => fetchCourseDiscountEnroll(recommendedCoursesById),
    enabled: !!recommendedCoursesById,
  });

  useEffect(() => {
    if (!isRecommendedCourseShow) {
      setRecommendedCoursesById(null);
    }
  }, [isRecommendedCourseShow]);

  const handleClose = () => {
    setIsRecommendedCourseShow(false);
    setRecommendedCoursesById(null);
  };

  const { mutate: Inquiry } = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchCourseDiscountEnroll],
      });
      navigate(`/${pathName}/message`);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

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
        title: data?.message,
      });
      const payload = {
        userId: userID as number,
        courseId: recommendeddata?.id,
      };
      Inquiry(payload);

      navigate(`/${pathName}/message?chatId=${data?.data?.receiverId}`);

      socket.emit("new message", data?.data);
    },
    onError: (error: ErrorType) => {
      setRecommendedCoursesById(null);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const handleInquire = (data: RecommendedCourses[] | any) => {
    const payload = {
      senderId: userID,
      receiverId: data?.trainerCompanyId
        ? data?.trainerCompanyId?.userDetails?.id
        : data?.trainerId?.userDetails?.id,
      message: data?.title,
      images: [data?.bannerImage],
    };
    handleSend(payload);
  };

  return (
    <>
      <Modal
        open={isRecommendedCourseShow}
        onClose={handleClose}
        className={`py-[60px] px-6 ${
          isPendingCourseDEnroll
            ? "h-[200px]"
            : fetchCourseDiscountEnrollFun?.data &&
              fetchCourseDiscountEnrollFun?.data?.length > 0
            ? "max-w-[800px] max-h-[800px] h-auto"
            : "h-[200px]"
        }`}
      >
        <RecommendedCoursesModel
          data={fetchCourseDiscountEnrollFun?.data || []}
          isLoading={isPendingCourseDEnroll}
          setOpen={setIsRecommendedCourseShow}
        />
      </Modal>
      <div
        className="w-full border border-solid border-[#D9D9D9] rounded col-span-1 overflow-hidden"
        key={recommendeddata.id}
      >
        <div
          className="relative overflow-hidden h-[231px] cursor-pointer"
          onClick={() => {
            dispatch(
              setPath([
                {
                  label: `Course Management`,
                  link: null,
                },
                {
                  label: `Recommended Courses`,
                  link: `/${Role}/coursesrecommended`,
                },
                {
                  label: `${recommendeddata.title}`,
                  // @ts-ignore
                  link: `/${Role}/employee-basic-course/${recommendeddata?.currentVersion?.id}`,
                },
              ])
            );
            navigate(
              // @ts-ignore
              `/${Role}/employee-basic-course/${recommendeddata?.currentVersion?.id}`
            );
          }}
        >
          <img
            src={recommendeddata?.bannerImage}
            alt="course"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="">
          <div
            className="min-h-[291px] max-h-[335px] h-full sm:px-[19px] sm:py-[14px] p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => {
              dispatch(
                setPath([
                  {
                    label: `Course Management`,
                    link: null,
                  },
                  {
                    label: `Recommended Courses`,
                    link: `/${Role}/coursesrecommended`,
                  },
                  {
                    label: `${recommendeddata.title}`,
                    // @ts-ignore
                    link: `/${Role}/employee-basic-course/${recommendeddata?.currentVersion?.id}`,
                  },
                ])
              );
              navigate(
                // @ts-ignore
                `/${Role}/employee-basic-course/${recommendeddata?.currentVersion?.id}`
              );
            }}
          >
            <div>
              <span className="font-droid lg:text-base text-sm line-clamp-2 mb-3 font-semibold h-[48px]">
                {recommendeddata.title}
              </span>
              <h3 className="text-[#000000] text-[18px] font-droid font-[600] sm:w-[100px] w-[80px] mb-3">
                €{recommendeddata.price}
              </h3>
              <div className="mb-3">
                <div className="flex start md:gap-4 sm:gap-3 gap-2 flex-wrap leading-[22px] min-h-[122px] 2xl:min-h-0 content-baseline">
                  {recommendeddata?.courseData?.map((item) => {
                    return (
                      <div className="flex gap-2 items-center">
                        <p
                          className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full sm:text-base text-sm font-normal font-droid leading-[22px]`}
                        >
                          {item?.fetchPillar?.pillarName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-5">
                <div className="gap-2 col-span-2">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className="h-[16] w-[18px]" src={speed} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      Level-
                      {recommendeddata?.courseData?.[0]?.fetchMaturity
                        ?.maturityLevelName || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={fulltime}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      {recommendeddata.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {recommendeddata.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className=" h-[16] w-[18px]" src={time} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      {recommendeddata.duration || "--"}
                    </p>
                  </div>
                </div>

                <div className="gap-2 col-span-3">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px] text-black"
                      src={diploma}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      {recommendeddata?.universityAddress || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={online}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      {recommendeddata.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {recommendeddata.isOnline === IsOnline["In-Person"] && (
                        <span>InPerson</span>
                      )}
                      {recommendeddata.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                      {recommendeddata.isOnline ===
                        IsOnline["Self-paced Online"] && (
                        <span>Self-paced Online</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-1">
                      {recommendeddata?.otherInstitutionName || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t sm:py-[12px] sm:px-[15px] p-2.5 grid grid-cols-7 items-center xl:gap-0 gap-3">
            <div className="2xl:col-span-2 col-span-3">
              <img
                className="object-cover object-center"
                src={atu}
                alt="Course"
              />
            </div>
            <div className="2xl:col-span-5 col-span-4 xl:mr-0 ml-auto m-0 flex items-center min-[1600px]:flex-col min-[1800px]:flex-row flex-col gap-2">
              {recommendeddata?.inquire ? (
                <Button
                  className="bg-[#00778B] sm:h-[43px] px-4 sm:text-base text-sm w-[143px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/${pathName}/message?chatId=${
                        recommendeddata?.trainerCompanyId
                          ? recommendeddata?.trainerCompanyId?.userDetails?.id
                          : recommendeddata?.trainerId?.userDetails?.id
                      }`
                    );
                  }}
                >
                  Show Message
                </Button>
              ) : (
                <Button
                  className=" h-[42px] bg-[#00778B] text-white font-semibold px-4 py-2 w-[143px] rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInquire(recommendeddata || []);
                    setRecommendedCoursesById(recommendeddata?.id);
                  }}
                  disabled={
                    !isRecommendedCourseShow &&
                    recommendedCoursesById === recommendeddata?.id
                  }
                >
                  {!isRecommendedCourseShow &&
                    recommendedCoursesById === recommendeddata?.id && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}{" "}
                  Enquire
                </Button>
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRecommendedCourseShow(true);
                  setRecommendedCoursesById(recommendeddata?.id);
                }}
                className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[143px]"
                disabled={
                  (recommendeddata?.enrolled &&
                    recommendeddata?.enrolledStatus === 1) ||
                  (recommendeddata?.enrolled &&
                    recommendeddata?.enrolledStatus === 0)
                }
              >
                {recommendeddata?.enrolled
                  ? recommendeddata?.enrolledStatus === 1
                    ? "Enrolled"
                    : recommendeddata?.enrolledStatus === 0
                    ? "Pending Enrollment"
                    : "Enroll Now"
                  : "Enroll Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseGridView;
